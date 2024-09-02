import { compare } from "bcrypt";

import DrippleError from "../utils/DrippleError.js";

export function validateBuyCoins(req, res, next) {
    req.body.amount = req.body.amount?.trim();

    try {
        // Checks if the requested amount is a positive number.
        if (isNaN(req.body.amount) || +req.body.amount <= 0) {
            throw new DrippleError("Amount must be a positive number.", 400);
        }
        
        // Checks if the requested amount does not exceed 1000.
        if (+req.body.amount > 1000) {
            throw new DrippleError("Transaction is limited to 1000 DRP.", 400);
        }
        
        // If there are no errors, call the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}

export async function validateSendCoins(req, res, next) {
    req.body.to = req.body.to?.trim();
    req.body.amount = req.body.amount?.trim();

    try {
        // Checks if the requested amount is a positive number.
        if (isNaN(req.body.amount) || +req.body.amount <= 0) {
            throw new DrippleError("Amount must be a positive number.", 400);
        }

        // Checks if the requested amount does not exceed 1000.
        if (+req.body.amount > 1000) {
            throw new DrippleError("Transaction is limited to 1000 DRP.", 400);
        }

        // Checks if the request amount does not exceed the user's balance.
        const balance = await req.web3.eth.getBalance(req.session.user);
        if (+req.body.amount > +req.web3.utils.fromWei(balance, "ether")) {
            throw new DrippleError("Insufficient funds.", 400);
        }

        // Checks if the recipient's address belongs to an existing user.
        let [results,] = await req.db.query("SELECT Address FROM User WHERE Address = ?", [req.body.to]);
        if (results.length === 0) {
            throw new DrippleError("The address provided does not belong to an existing user.", 404);
        }

        // Checks if the recipient is different from the sender.
        if (results[0]["Address"] === req.session.user) {
            throw new DrippleError("Cannot send money to self.", 404);
        }
        
        // Checks if the provided password is correct.
        [results,] = await req.db.query("SELECT Password FROM User WHERE Address = ?", [req.session.user]);
        const hashedPassword = results[0]["Password"];
        const match = await compare(req.body.password, hashedPassword);
        if (!match) {
            throw new DrippleError("Incorrect password.", 400);
        }

        // If there are no errors, call the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}

export async function validateMint(req, res, next) {
    req.body.name = req.body.name?.trim();
    req.body.collection = req.body.collection?.trim();
    req.body.type = req.body.type?.trim().toLowerCase();
    req.body.description = req.body.description?.trim();

    const allowedTypes = ["clothing", "accessories", "footwear", "hairstyles", "makeup", "body modifications"];

    try {
        // Checks if name is empty.
        if (!req.body.name) {
            throw new DrippleError("Name cannot be empty.", 400);
        }

        // Checks if collection is empty.
        if (!req.body.collection) {
            throw new DrippleError("Collection cannot be empty.", 400);
        }

        // Checks if type is correct.
        if (!allowedTypes.includes(req.body.type)) {
            throw new DrippleError("Type is missing or invalid. Must be one of: 'Clothing', 'Accessories', 'Footwear', 'Hairstyles', 'Makeup', 'Body Modifications'.", 400);
        }

        // Checks if description is empty.
        if (!req.body.description) {
            throw new DrippleError("Description cannot be empty.", 400);
        }

        // Checks if password is empty.
        if (!req.body.password) {
            throw new DrippleError("Password cannot be empty.", 400);
        }

        // Checks if an image file has been provided for the NFT.
        if (req.file === undefined) {
            throw new DrippleError("File not supplied.", 400);
        }

        // Checks if the user has at least 0.5 DRP to mint the NFT.
        const balance = await req.web3.eth.getBalance(req.session.user);
        if (+req.web3.utils.fromWei(balance, "ether") < 0.5) {
            throw new DrippleError("Insufficient funds. Need at least 0.5 DRP to mint an asset.", 400);
        }

        // Checks if the NFT being minted exists.
        let [results,] = await req.db.query(
            "SELECT TokenID FROM Asset WHERE Name = ? AND Collection = ? AND Type = ?", 
            [req.body.name, req.body.collection, req.body.type]
        );
        if (results.length !== 0) {
            throw new DrippleError("The NFT you are trying to mint already exists.", 400);
        }

        // Checks if the provided password is correct.
        [results,] = await req.db.query("SELECT Password FROM User WHERE Address = ?", [req.session.user]);
        const hashedPassword = results[0]["Password"];
        const match = await compare(req.body.password, hashedPassword);
        if (!match) {
            throw new DrippleError("Incorrect password.", 400);
        }

        // If there are no errors, call the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}

export function validatePatchProfile(req, res, next) {
    req.body.username = req.body.username?.trim();
    req.body.displayName = req.body.displayName?.trim();

    try {
        // Checks if username is empty.
        if (!req.body.username) {
            throw new DrippleError("Username cannot be empty.", 400);
        }
        
        // Checks if display name is empty.
        if (!req.body.displayName) {
            throw new DrippleError("Display name cannot be empty.", 400);
        }
        
        // If there are no errors, call the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}