import date from "date-and-time";
import { hash } from "bcrypt";
const saltRounds = 10;

export async function handleSignUp(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Creates a new user account on the blockchain.
        const userAddress = await req.web3.eth.personal.newAccount(password);
        // Hashes the user's password to add to database.
        const hashedPassword = await hash(password, saltRounds);

        // Adds the user's information into the MySQL database.
        await req.db.query(
            "INSERT INTO User VALUES (?, ?, ?, ?, ?, ?, ?)",
            [userAddress, email, hashedPassword, email, email, date.format(new Date(), "YYYY-MM-DD"), ""]
        );

        // Gives the new user 50 DRP to their wallet.
        const initialDeposit = await req.web3.eth.sendTransaction({
            from: process.env.COINBASE,
            to: userAddress,
            value: req.web3.utils.toWei(50, "ether"),
            gasPrice: 1000000,
            gasLimit: 21000
        });

        // Records this initial transaction into the database.
        await req.db.query(
            "INSERT INTO `Transaction` VALUES (?, ?, ?, ?, ?)",
            [initialDeposit.transactionHash, initialDeposit.from, initialDeposit.to, date.format(new Date(), "YYYY-MM-DD HH:mm:ss"), "Welcome to Dripple!"]
        );

        // Unlocks this account for a long time for transactions.
        await req.web3.eth.personal.unlockAccount(userAddress, password, 9223372036);
        
        // The newly created user is automatically logged in.
        req.session.user = userAddress;

        // Sends a success response.
        res.status(200).json({
            status: 200,
            data: {
                isSuccessful: true,
                isLoggedIn: true,
                accountAddress: userAddress
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function handleLogIn(req, res) {
    // The user is logged in when session.user is not undefined.
    // req.address is populated by validateLogIn.
    req.session.user = req.address;

    try {
        // Unlocks this account for a long time for transactions.
        await req.web3.eth.personal.unlockAccount(req.session.user, req.body.password, 9223372036);

        // Sends a success response.
        res.status(200).json({
            status: 200,
            data: {
                isLoggedIn: true,
                accountAddress: req.session.user
            }
        });
    } catch (error) {
        next(error);
    }
}

export function handleLogOut(req, res) {
    // The user is logged out when session.user is undefined.
    req.session.user = undefined;

    // Sends a success response.
    res.status(200).json({
        status: 200,
        data: {
            isLoggedIn: false
        }
    });
}

export function handleGetLogIn(req, res) {
    // Sends a response indicating whether the user is logged in or not.
    res.status(200).json({
        status: 200,
        data: {
            isLoggedIn: req.session.user !== undefined,
            accountAddress: req.session.user || ""
        }
    });
}