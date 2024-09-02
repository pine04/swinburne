import date from "date-and-time";

import DrippleError from "../utils/DrippleError.js";

export async function handleGetMarketplaceCount(req, res, next) {
    // Set defaults to search/filter options if the user has not provided any.
    const searchQuery = req.query.searchQuery || "";
    const type = req.query.type || "";

    try {
        // Retrieves the number of available postings satisfying the requested parameters.
        const [results,] = await req.db.query(
            "SELECT COUNT(Asset.TokenID) AS Count " +
            "FROM Asset " +
            "JOIN MarketplacePosting ON Asset.TokenID = MarketplacePosting.TokenID " +
            `WHERE IsTraded = 0 ${type ? `AND Type = '${type}'` : ""} ${searchQuery ? `AND Name LIKE '%${searchQuery}%'` : ""} `
        );
        
        // Sends a success response.
        res.status(200).json({
            status: 200,
            count: results[0]["Count"]
        });
    } catch (error) {
        next(error);
    }
}

export async function handleGetMarketplacePostings(req, res, next) {
    // Set defaults to search/filter/sort options if the user has not provided any.
    const page = req.query.page || 1;
    const searchQuery = req.query.searchQuery || "";
    const type = req.query.type || "";
    const sortBy = req.query.sortBy || "timeposted";
    const sortOrder = req.query.sortOrder || "desc";

    try {
        // Retrieves a page of 20 postings based on the pagination, search, and filter parameters.
        const [results,] = await req.db.query(
            "SELECT postingId, Asset.TokenID AS tokenId, name, timeMinted, collection, type, splashImage, price, timePosted, username, displayName " +
            "FROM Asset " +
            "JOIN MarketplacePosting ON Asset.TokenID = MarketplacePosting.TokenID " +
            "JOIN User ON User.Address = MarketplacePosting.UserAddress " +
            `WHERE IsTraded = 0 ${type ? `AND Type = '${type}'` : ""} ${searchQuery ? `AND Name LIKE '%${searchQuery}%'` : ""} ` +
            `ORDER BY ${sortBy} ${sortOrder} ` +
            "LIMIT 20 OFFSET ? ",
            [(page - 1) * 20]
        );
        
        // Sends a success response.
        res.status(200).json({
            status: 200,
            items: results
        });
    } catch (error) {
        next(error);
    }
}

export async function handleGetMarketplacePostingById(req, res, next) {
    const postingId = req.params.postingId;

    try {
        // Selects the marketplace posting with the given posting ID.
        const [results,] = await req.db.query(
            "SELECT postingId, Asset.TokenID AS tokenId, name, timeMinted, collection, type, splashImage, description, price, isTraded, timePosted, address AS owner, username, displayName " +
            "FROM Asset " +
            "JOIN MarketplacePosting ON Asset.TokenID = MarketplacePosting.TokenID " +
            "JOIN User ON User.Address = MarketplacePosting.UserAddress " +
            `WHERE PostingID = ?`,
            [postingId]
        );
        
        // If there are no results, throws a 404 not found error.
        if (results.length === 0) {
            throw new DrippleError("Item not found.", 404);
        }

        // Sends a success response.
        res.status(200).json({
            status: 200,
            item: results[0]
        });
    } catch (error) {
        next(error);
    }
}

export async function handlePostMarketplace(req, res, next) {
    const account = req.session.user;
    const tokenId = req.body.tokenId;
    const price = req.body.price;

    try {
        // Inserts a new posting item into the MarketplacePosting table.
        await req.db.query(
            "INSERT INTO MarketplacePosting (TokenID, UserAddress, Price, IsTraded, TimePosted) VALUES (?, ?, ?, ?, ?)",
            [tokenId, account, price, 0, date.format(new Date(), "YYYY-MM-DD HH:mm:ss")]
        );
        
        // Sends a success response.
        res.status(200).json({
            status: 200,
            message: "Your NFT has been posted to the marketplace."
        });
    } catch (error) {
        next(error);
    }
}

export async function handlePurchase(req, res, next) {
    const buyer = req.session.user;
    const seller = req.seller;
    const tokenId = req.tokenId;
    const price = req.price;
    const postingId = req.body.postingId;

    try {
        // The buyer needs the seller's approval to transfer ownership of the NFT.
        const approve = await req.contract.methods.approve(buyer, tokenId).send({
            from: seller,
            gas: 50000,
            gasPrice: 1000000
        });

        // The approval is a transaction that costs a small amount of gas fee. Records this in the database.
        await req.db.query(
            "INSERT INTO Transaction VALUES (?, ?, ?, ?, ?)",
            [approve.transactionHash, seller, process.env.CONTRACT_ADDRESS, date.format(new Date(), "YYYY-MM-DD HH:mm:ss"), `Gas fee to approve the transfer of NFT with ID ${tokenId}.`]
        );
        
        // Transfer the NFT to the buyer and money to the seller.
        const purchaseResponse = await req.contract.methods.purchaseNFT(seller, tokenId).send({
            from: buyer,
            value: req.web3.utils.toWei(price, "ether"),
            gas: req.web3.utils.toHex(500000),
            gasPrice: "1000000"
        });

        // Records the transaction in the database.
        await req.db.query(
            "INSERT INTO Transaction VALUES (?, ?, ?, ?, ?)",
            [purchaseResponse.transactionHash, buyer, seller, date.format(new Date(), "YYYY-MM-DD HH:mm:ss"), `Purchase of NFT with ID ${tokenId}.`]
        );

        // Sets the IsTraded flag of the posting to true (1).
        await req.db.query(
            "UPDATE MarketplacePosting SET IsTraded = 1 WHERE PostingID = ?",
            [postingId]
        );

        // Sends a success response.
        res.status(200).json({
            status: 200,
            message: "NFT bought successfully"
        });
    } catch (error) {
        next(error);
    }
}