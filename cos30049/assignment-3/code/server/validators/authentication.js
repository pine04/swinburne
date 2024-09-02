import DrippleError from "../utils/DrippleError.js";
import { compare } from "bcrypt";

export async function validateSignUp(req, res, next) {
    req.body.email = req.body.email?.trim();

    try {
        // The user must be logged out in order to sign up.
        if (req.session.user) {
            throw new DrippleError("Already logged in. Must log out first before performing this operation.", 400);
        }

        // Checks if the provided email already exists.
        const [results,] = await req.db.query("SELECT Email FROM User WHERE Email = ?", [req.body.email]);
        if (results.length !== 0) {
            throw new DrippleError("Email already exists.", 400);
        }

        // If there are no errors, calls the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}

export async function validateLogIn(req, res, next) {
    req.body.email = req.body.email?.trim();

    try {
        // The user must be logged out in order to log in.
        if (req.session.user) {
            throw new DrippleError("Already logged in. Must log out first before performing this operation.", 400);
        }

        // Check if the provided email exists.
        const [results,] = await req.db.query("SELECT Address, Password FROM User WHERE Email = ?", [req.body.email]);
        if (results.length === 0) {
            throw new DrippleError("Account does not exist.", 400);
        }

        // Check if the provided password is correct.
        const hashedPassword = results[0]["Password"];
        const match = await compare(req.body.password, hashedPassword);
        if (!match) {
            throw new DrippleError("Incorrect password.", 400);
        }

        // If there are no errors, passes the account's address to req for the handler middleware.
        req.address = results[0]["Address"];
        // Calls the next middleware.
        next();
    } catch (error) {
        next(error);
    }
}

export function requireAuthentication(req, res, next) {
    try {
        // Checks if the user is logged in. If not, throws an error. Otherwise, calls the next middleware.
        if (req.session.user === undefined) {
            throw new DrippleError("Not logged in.", 401);
        }
        next();
    } catch (error) {
        next(error);
    }    
} 