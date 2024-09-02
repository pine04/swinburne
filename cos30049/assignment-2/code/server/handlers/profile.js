import date from "date-and-time";

import DrippleError from "../utils/DrippleError.js";

export async function handleBuyCoins(req, res, next) {
    const to = req.session.user;
    const amount = req.body.amount;

    try {
        // Sends the user coins from the address of the coinbase.
        const response = await req.web3.eth.sendTransaction({
            from: process.env.COINBASE,
            to: to,
            value: req.web3.utils.toWei(amount, "ether"),
            gasPrice: 1000000,
            gasLimit: 21000
        });

        // Records the transaction in the database.
        await req.db.query(
            "INSERT INTO Transaction VALUES (?, ?, ?, ?, ?)",
            [response.transactionHash, process.env.COINBASE, to, date.format(new Date(), "YYYY-MM-DD HH:mm:ss"), `Buying ${amount} coins.`]
        );

        // Sends a success response.
        res.status(200).json({
            status: 200,
            message: "Coins purchased successfully."
        });
    } catch (error) {
        next(error);
    }
}

export async function handleSendCoins(req, res, next) {
    const from = req.session.user;
    const to = req.body.to;
    const amount = req.body.amount;

    try {
        // Sends coins from the user's account to the recipient's address.
        const response = await req.web3.eth.sendTransaction({
            from: from,
            to: to,
            value: req.web3.utils.toWei(amount, "ether"),
            gasPrice: 1000000,
            gasLimit: 21000
        });

        // Records the transaction in the database.
        await req.db.query(
            "INSERT INTO Transaction VALUES (?, ?, ?, ?, ?)",
            [response.transactionHash, from, to, date.format(new Date(), "YYYY-MM-DD HH:mm:ss"), `Sending ${amount} DRP to ${to}.`]
        );

        // Sends a success response.
        res.status(200).json({
            status: 200,
            message: "Coins sent successfully."
        });
    } catch (error) {
        next(error);
    }
}

export async function handleMint(req, res, next) {
    const account = req.session.user;
    const name = req.body.name;
    const collection = req.body.collection;
    const type = req.body.type;
    const description = req.body.description;
    const splashLocation = req.file.filename;

    // The uniqueness of an NFT is determined by the combination of its name, collection, and type.
    const itemToMint = name + "/" + collection + "/" + type;

    try {
        // Calls the smart contract function to mint the NFT.
        const mintResponse = await req.contract.methods.safeMint(itemToMint).send({
            from: account,
            value: req.web3.utils.toWei(0.5, "ether"),
            gas: req.web3.utils.toHex(200000),
            gasPrice: "1000000"
        });

        // Receives the minted token ID.
        const tokenId = mintResponse.events.Transfer.returnValues.tokenId;

        // Inserts the newly minted NFT into the database.
        await req.db.query(
            "INSERT INTO Asset VALUES (?, ?, ?, ?, ?, ?, ?)",
            [tokenId, name, date.format(new Date(), "YYYY-MM-DD HH:mm:ss"), collection, type, description, splashLocation]
        );

        // Records the transaction into the database.
        await req.db.query(
            "INSERT INTO `Transaction` VALUE (?, ?, ?, ?, ?)",
            [mintResponse.transactionHash, account, process.env.COINBASE, date.format(new Date(), "YYYY-MM-DD HH:mm:ss"), `Minting NFT with token ${tokenId}`]
        );

        // Sends a success response.
        res.status(200).json({
            status: 200,
            message: "Your asset has been minted successfully."
        });
    } catch (error) {
        next(error);
    }
}

export async function handleGetProfile(req, res, next) {
    const account = req.session.user;

    try {
        // Gets the user's basic account information from the database.
        const [results,] = await req.db.query("SELECT address, email, username, displayName, dateJoined, profileDescription FROM User WHERE Address = ?", [account]);
        const accountInfo = results[0];

        // Reads their wallet balance from the blockchain.
        const balance = await req.web3.eth.getBalance(account);

        // Reads the number of owned NFTs from the blockchain.
        const ownedNFTs = await req.contract.methods.getOwnedAssets(account).call();

        // Reads the number of traded or uploaded NFTs from the database.
        const [count,] = await req.db.query("SELECT COUNT(*) AS Count FROM MarketplacePosting WHERE UserAddress = ? AND IsTraded = 1", [account]);

        // Sends the information back to the user.
        res.status(200).json({
            status: 200,
            accountInformation: {
                ...accountInfo,
                balance: req.web3.utils.fromWei(balance, "ether"),
                itemsOwned: ownedNFTs.length,
                itemsSold: count[0]["Count"]
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function handlePatchProfile(req, res, next) {
    const account = req.session.user;

    // This object contains any updated information.
    const updatedInfo = { };
    req.body.username !== undefined && (updatedInfo.username = req.body.username);
    req.body.displayName !== undefined && (updatedInfo.displayName = req.body.displayName);
    req.body.profileDescription !== undefined && (updatedInfo.profileDescription = req.body.profileDescription);

    try {
        // Runs the query only if the user has specified some information to be changed.
        if (Object.keys(updatedInfo).length !== 0) {
            await req.db.query(
                "UPDATE User SET ? WHERE Address = ?",
                [updatedInfo, account]
            );
        }

        // Sends a success response. 
        res.status(200).json({
            status: 200,
            message: "Updated profile successfully."
        });
    } catch (error) {
        next(error);
    }
}

export async function handleGetCollectedAssets(req, res, next) {
    const account = req.session.user;
    
    const collectedAssets = [];

    try {
        // Reads the user's owned assets from the smart contract.
        const tokenIds = await req.contract.methods.getOwnedAssets(account).call();

        // For each owned asset, reads its information from the database and adds it to the array.
        for (const tokenId of tokenIds) {
            const [result,] = await req.db.query("SELECT tokenId, `name`, timeMinted, collection, `type`, `description`, splashImage FROM Asset WHERE TokenID = ?", [tokenId]);
            const assetInfo = result[0];

            collectedAssets.push(assetInfo);
        }

        // Sends back the array of collected assets.
        res.status(200).json({
            status: 200,
            assets: collectedAssets
        });
    } catch (error) {
        next(error);
    }
}

export async function handleGetCollectedAssetById(req, res, next) {
    const account = req.session.user;
    const tokenId = req.params.tokenId;

    try {
        // Reads the information of the requested asset from the database.
        const [results,] = await req.db.query("SELECT tokenId, name, timeMinted, collection, type, description, splashImage FROM Asset WHERE TokenID = ?", [tokenId]);
        
        // If no assets match, return a 404 not found response.
        if (results.length === 0) {
            throw new DrippleError("Token ID does not exist.", 404);
        }

        // Otherwise, checks if the user owns the asset.
        const owner = await req.contract.methods.ownerOf(tokenId).call();
        if (account !== owner) {
            throw new DrippleError("You do not own this token.", 401);
        }

        // Sends back the asset information.
        res.status(200).json({
            status: 200,
            assetInfo: results[0]
        });
    } catch (error) {
        next(error);
    }
}

export async function handleGetTransactions(req, res, next) {
    const account = req.session.user;
    const transactions = [];

    try {
        // Reads all transactions related to the user from the database.
        const [results,] = await req.db.query(
            "SELECT TransactionHash AS `hash`, AddressFrom AS `from`, AddressTo AS `to`, `time`, description FROM `Transaction` WHERE AddressFrom = ? OR AddressTo = ? ORDER BY `Time` DESC", 
            [account, account]
        );

        // For each transaction, read its receipt from the blockchain and add its information to the array.
        for (const transaction of results) {
            const transactionDetails = await req.web3.eth.getTransaction(transaction["hash"]);

            transactions.push({
                ...transaction,
                value: req.web3.utils.fromWei(transactionDetails.value, "ether").toString(),
                gasFee: req.web3.utils.fromWei(transactionDetails.gas * transactionDetails.gasPrice, "ether").toString()
            });
        }

        // Sends back the list of transactions.
        res.status(200).json({
            status: 200,
            transactions: transactions
        });
    } catch (error) {
        next(error);
    }
}

export async function handleGetTradedAssets(req, res, next) {
    const account = req.session.user;

    try {
        // Reads the user's traded assets from the database.
        const [results,] = await req.db.query(
            "SELECT postingId, Asset.TokenID AS tokenId, name, collection, type, description, splashImage, price, isTraded, timePosted FROM Asset JOIN MarketplacePosting ON Asset.TokenID = MarketplacePosting.TokenID WHERE UserAddress = ?",
            [account]
        );

        // Sends back the list of assets.
        res.status(200).json({
            status: 200,
            tradedItems: results
        });
    } catch (error) {
        next(error);
    }
}