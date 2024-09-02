require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./features/auth/auth.router");
const profileRouter = require("./features/profile/profile.router");
const postsRouter = require("./features/posts/posts.router");
const { handleError, defaultMiddleware } = require("./utils/helpers");

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
}));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../tmt/dist")));
app.use(
    session({
        secret: "textmetomorrow", // probably put in env file :)
        cookie: {
            maxAge: 14 * 24 * 3600 * 1000
        },
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            ttl: 14 * 24 * 3600
        })
    })
);

app.use("/api", authRouter, profileRouter, postsRouter);
app.use("*", (req, res) => {
    console.log("yay")
    res.sendFile(path.resolve(__dirname, "../../tmt/dist/index.html"));
});
app.use(handleError);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

process.on("SIGINT", () => {
    console.log("Closing server...");
    process.exit(0);
});
