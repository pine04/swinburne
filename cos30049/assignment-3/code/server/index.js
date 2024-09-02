import express from "express";
import session from "express-session";
import f from "session-file-store";
import multer from "multer";
import { config } from "dotenv";
import { createConnection } from "mysql2/promise";
import { Web3 } from "web3";
import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";

import ABI from "./DrippleABI.json" assert { type: "json" };
import { 
    validateSignUp, 
    validateLogIn, 
    requireAuthentication 
} from "./validators/authentication.js";
import { 
    handleGetLogIn, 
    handleLogIn, 
    handleLogOut, 
    handleSignUp 
} from "./handlers/authentication.js";
import { 
    validateBuyCoins, 
    validateSendCoins, 
    validateMint, 
    validatePatchProfile 
} from "./validators/profile.js";
import { 
    handleBuyCoins, 
    handleGetCollectedAssetById, 
    handleGetCollectedAssets, 
    handleGetProfile, 
    handleGetTradedAssets, 
    handleGetTransactions, 
    handleMint, 
    handlePatchProfile, 
    handleSendCoins 
} from "./handlers/profile.js";
import { 
    validateGetMarketplaceCount,
    validateGetMarketplacePostings,
    validatePostMarketplace, 
    validatePurchase 
} from "./validators/marketplace.js";
import { 
    handleGetMarketplaceCount,
    handleGetMarketplacePostingById, 
    handleGetMarketplacePostings, 
    handlePostMarketplace, 
    handlePurchase 
} from "./handlers/marketplace.js";
import DrippleError from "./utils/DrippleError.js";

// Loads the .env file.
config();

// Initializes the FileStore interface.
const FileStore = f(session);

// Creates the database connection and connects to the database.
const connection = await createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
connection.connect();

// Sets up the Web3 connection to the blockchain and smart contract.
const web3 = new Web3(process.env.BLOCKCHAIN_ADDRESS);
const contract = new web3.eth.Contract(ABI.abi, process.env.CONTRACT_ADDRESS);

// Sets up the storage option for Multer.
const storage = multer.diskStorage({
    destination: process.env.UPLOAD_FOLDER,
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split(".").pop();
        const fileName = `${file.fieldname}_${Date.now()}.${fileExtension}`;
        cb(null, fileName);
    }
})

// Creates a Multer instance to generate middlewares that handle FormData.
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!(/\.(jpe?g|png|webp)$/i).test(file.originalname)) {
            return cb(new DrippleError("File must be an image of type .jpg, .jpeg, .png, or .webp.", 400));
        }
        cb(null, true);
    }
});

// Creates the Express application.
const app = express();

// Middleware to log the request to the console and attach the connection, web3, and contract instances to the request 
// object for use in later middlewares.
app.use((req, res, next) => {
    appendFile(
        "logs.txt", 
        `[${new Date().toLocaleString()}]` + " " + req.method + " " + req.originalUrl + "\n"
    );
    console.log(`[${new Date().toLocaleString()}]` + " " + req.method + " " + req.originalUrl);
    req.db = connection;
    req.web3 = web3;
    req.contract = contract;
    next();
});

// Special route to serve uploaded splash images.
app.use("/uploads", express.static(import.meta.dirname + "/uploads"));
// Static route to serve the front-end after building.
app.use(express.static(resolve(import.meta.dirname, "../client/dist")));

// Middlewares to process JSON and urlencoded request bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creates the session.
app.use(session({
    secret: process.env.PORT,
    cookie: {
        maxAge: 6 * 3600 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new FileStore({
        ttl: 6 * 3600
    })
}));

// The list of routes.
app.get("/api/login", handleGetLogIn);
app.post("/api/signup", validateSignUp, handleSignUp);
app.post("/api/login", validateLogIn, handleLogIn);
app.post("/api/logout", handleLogOut);

app.get("/api/profile", requireAuthentication, handleGetProfile);
app.patch("/api/profile", requireAuthentication, validatePatchProfile, handlePatchProfile);

app.get("/api/collected", requireAuthentication, handleGetCollectedAssets);
app.get("/api/collected/:tokenId", requireAuthentication, handleGetCollectedAssetById);
app.get("/api/traded", requireAuthentication, handleGetTradedAssets);
app.get("/api/transactions", requireAuthentication, handleGetTransactions);

app.post("/api/sendCoins", requireAuthentication, validateSendCoins, handleSendCoins);
app.post("/api/buyCoins", requireAuthentication, validateBuyCoins, handleBuyCoins);
app.post("/api/mint", requireAuthentication, upload.single("splash"), validateMint, handleMint);

app.get("/api/marketplaceCount", validateGetMarketplaceCount, handleGetMarketplaceCount);
app.get("/api/marketplace", validateGetMarketplacePostings, handleGetMarketplacePostings);
app.get("/api/marketplace/:postingId", handleGetMarketplacePostingById);
app.post("/api/marketplace", requireAuthentication, validatePostMarketplace, handlePostMarketplace);
app.post("/api/purchase", requireAuthentication, validatePurchase, handlePurchase);

// Error handling middleware. Invoked when an error is thrown while other middlewares are executing.
app.use((err, req, res, next) => {
    const statusCode = err.code || 500;
    const message = err.message || "Something went wrong.";

    appendFile(
        "errors.txt", 
        `[${new Date().toLocaleString()}]` + " " + req.method + " " + req.originalUrl + "\n" + statusCode + " " + message + "\n\n"
    );

    res.status(statusCode).json({
        status: statusCode,
        message: message
    });
});

// Starts the backend server.
app.listen(
    process.env.PORT, 
    () => {
        console.log(`Server started on port ${process.env.PORT}...`);
        appendFile(
            "logs.txt", 
            `[${new Date().toLocaleString()}]` + ` Server started on port ${process.env.PORT}.\n`
        );
    }
);