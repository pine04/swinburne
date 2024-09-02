const express = require("express");
const {
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetLoginStatus
} = require("./auth.middlewares");

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/login-status", handleGetLoginStatus);

module.exports = router;
