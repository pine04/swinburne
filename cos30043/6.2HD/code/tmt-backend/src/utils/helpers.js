const createError = require("http-errors");

function requireAuthentication(req, res, next) {
    if (!req.session.username) {
        return next(createError(401, "Not logged in."));
    } else {
        next();
    }
}

function handleError(err, req, res, next) {
    const status = err.status || 500;
    const message = err.status === 500 ? "An error happened on the server." : (err.message || "An error happened on the server");

    console.log(err);

    res.status(status).json({ message });
}

function defaultMiddleware(req, res) {
    res.status(404).json({
        message: "404 Not Found"
    });
}

module.exports = { 
    requireAuthentication,
    handleError,
    defaultMiddleware
};