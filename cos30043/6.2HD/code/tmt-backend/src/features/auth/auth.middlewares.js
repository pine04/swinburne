const createError = require("http-errors");

const { hash, compare } = require("../../services/bcrypt");
const { registrationSchema, loginSchema } = require("./auth.schemas");
const { getUserByUsername, getUserByEmail, createUser } = require("../../models/user");

async function handleRegister(req, res, next) {
    const { error, value: user } = registrationSchema.validate(req.body);

    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const { username, email, password } = user;

    try {
        const userWithUsername = await getUserByUsername(username);
        if (userWithUsername.length !== 0) {
            return next(createError(400, `The username '${username}' already exists.`));
        }

        const userWithEmail = await getUserByEmail(email);
        if (userWithEmail.length !== 0) {
            return next(createError(400, `The email '${email}' is already used.`));
        }

        const passwordHash = await hash(password);
        user.password = passwordHash;

        const queryResult = await createUser(user);

        req.session.userId = queryResult.insertId;
        req.session.username = username;

        res.status(200).json({
            message: `Registered successfully.`,
            username: username
        });
    } catch (error) {
        next(error);
    }
}

async function handleLogin(req, res, next) {
    const { error, value, artifacts } = loginSchema.validate(req.body);

    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const { usernameOrEmail, password } = value;
    const isUsername = artifacts.has("username");

    try {
        const user = await (isUsername ? getUserByUsername(usernameOrEmail) : getUserByEmail(usernameOrEmail));

        if (user.length === 0) {
            return next(createError(400, "User does not exist."));
        }

        const passwordHash = user[0]["Password"];
        const match = await compare(password, passwordHash);

        if (!match) {
            return next(createError(400, "Password incorrect."));
        }

        req.session.userId = user[0]["UserID"];
        req.session.username = user[0]["Username"];

        res.status(200).json({
            message: "Logged in successfully.",
            username: user[0]["Username"]
        });
    } catch (error) {
        next(error);
    }
}

function handleLogout(req, res) {
    req.session.destroy();

    res.status(200).json({ message: "Logged out." });
}

function handleGetLoginStatus(req, res) {
    res.status(200).json({
        isLoggedIn: !!req.session.username,
        username: req.session.username || ""
    });
}

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetLoginStatus,
};
