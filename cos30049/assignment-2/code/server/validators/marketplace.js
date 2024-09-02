import DrippleError from "../utils/DrippleError.js";

export async function validateGetMarketplaceCount(req, res, next) {
    req.query.searchQuery = req.query.searchQuery?.trim();
    req.query.type = req.query.type?.trim().toLowerCase();

    const allowedTypes = ["clothing", "accessories", "footwear", "hairstyles", "makeup", "body modifications"];

    try {
        // Checks if type is allowed if it is specified.
        if (req.query.type && !allowedTypes.includes(req.query.type)) {
            throw new DrippleError("Type is invalid. Must be one of: 'Clothing', 'Accessories', 'Footwear', 'Hairstyles', 'Makeup', 'Body Modifications'.", 400);
        }

        // If there are no errors, calls the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}

export async function validateGetMarketplacePostings(req, res, next) {
    req.query.page = req.query.page?.trim();
    req.query.searchQuery = req.query.searchQuery?.trim();
    req.query.type = req.query.type?.trim().toLowerCase();
    req.query.sortBy = req.query.sortBy?.trim().toLowerCase();
    req.query.sortOrder = req.query.sortOrder?.trim().toLowerCase();

    const allowedTypes = ["clothing", "accessories", "footwear", "hairstyles", "makeup", "body modifications"];
    const allowedSortBys = ["timeposted", "price"];
    const allowedSortOrders = ["asc", "desc"];

    try {
        // Checks if page is a positive integer if it is specified.
        if (req.query.page && (!Number.isInteger(+req.query.page) || +req.query.page <= 0)) {
            throw new DrippleError("Page must be a positive integer.", 400);
        }

        // Checks if type is allowed if it is specified.
        if (req.query.type && !allowedTypes.includes(req.query.type)) {
            throw new DrippleError("Type is invalid. Must be one of: 'Clothing', 'Accessories', 'Footwear', 'Hairstyles', 'Makeup', 'Body Modifications'.", 400);
        }

        // Checks if sortBy is allowed if it is specified.
        if (req.query.sortBy && !allowedSortBys.includes(req.query.sortBy)) {
            throw new DrippleError("SortBy parameter is invalid. Must be either 'TimePosted' or 'Price'.", 400);
        }

        // Checks if sortOrder is allowed if it is specified.
        if (req.query.sortOrder && !allowedSortOrders.includes(req.query.sortOrder)) {
            throw new DrippleError("Sort order is invalid. Must be either 'ASC' or 'DESC'.", 400);
        }

        // If there are no errors, calls the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}

export async function validatePostMarketplace(req, res, next) {
    req.body.tokenId = req.body.tokenId?.trim();
    req.body.price = req.body.price?.trim();

    const account = req.session.user;
    const tokenId = req.body.tokenId;

    try {
        // Checks if the token ID is empty.
        if (!req.body.tokenId) {
            throw new DrippleError("Token ID cannot be empty.", 400);
        }

        // Checks if price is empty
        if (!req.body.price) {
            throw new DrippleError("Price cannot be empty.", 400);
        }

        // Checks if price is a positive number.
        if (isNaN(req.body.price) || +req.body.price <= 0) {
            throw new DrippleError("Price must be a positive number.", 400);
        }

        // Checks if the token ID exists.
        let [result,] = await req.db.query("SELECT TokenID FROM Asset WHERE TokenID = ?", [tokenId]);
        if (result.length === 0) {
            throw new DrippleError("This NFT does not exist.", 404);
        }

        // Checks if the user owns the token.
        const owner = await req.contract.methods.ownerOf(tokenId).call();
        if (account !== owner) {
            throw new DrippleError("You do not own this NFT.", 403);
        }

        // Checks if the token is already on sale.
        [result,] = await req.db.query("SELECT TokenID FROM MarketplacePosting WHERE TokenID = ? AND IsTraded = 0", [tokenId]);
        if (result.length !== 0) {
            throw new DrippleError("This NFT is already on sale.", 400);
        }

        // If there are no errors, calls the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}

export async function validatePurchase(req, res, next) {
    const buyer = req.session.user;
    req.body.postingId = req.body.postingId?.trim();

    try {
        // Checks if the posting ID is empty.
        if (!req.body.postingId) {
            throw new DrippleError("Posting ID cannot be empty.", 400);
        }

        // Checks if the password is missing.
        if (!req.body.password) {
            throw new DrippleError("Password missing.", 400);
        }

        // Checks if the requested posting ID is available and on sale.
        let [results,] = await req.db.query("SELECT UserAddress, Price, TokenID, IsTraded FROM MarketplacePosting WHERE PostingID = ?", [req.body.postingId]);
        if (results.length === 0) {
            throw new DrippleError("This posting is not available.", 404);
        }
        if (results[0]["IsTraded"] === 1) {
            throw new DrippleError("This purchase is no longer available.", 404);
        }

        // Checks if the seller is different from the buyer.
        const seller = results[0]["UserAddress"];
        if (buyer === seller) {
            throw new DrippleError("You cannot buy your own NFT.", 400);
        }

        // Checks if the seller indeed owns the NFT.
        const tokenId = results[0]["TokenID"];
        const owner = await req.contract.methods.ownerOf(tokenId).call();
        if (seller !== owner) {
            throw new DrippleError("This NFT belongs to the incorrect owner.", 400);
        }

        // Checks if the buyer has enough money to buy the NFT.
        const price = results[0]["Price"];
        const balance = await req.web3.eth.getBalance(buyer);
        if (+price > +req.web3.utils.fromWei(balance, "ether")) {
            throw new DrippleError("Insufficient funds.", 400);
        }

        // If there are no errors, passes the token ID, price and seller to the request object and calls the next middleware.
        req.tokenId = tokenId;
        req.price = price;
        req.seller = seller;
        next();
    } catch (error) {
        next(error);
    }
}