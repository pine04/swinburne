const createError = require("http-errors");

const { getUserByUsername, getUsersAndFriendshipStatus, createFriendRequest, deleteFriendRequest, acceptFriendRequest, deleteFriendship, getFriendsOfUser, getUserAndFriendshipStatus, getReceivedFriendRequests, getSentFriendRequests } = require("../../models/user");
const { createFriendRequestSchema } = require("./users.schemas");

async function handleGetMyProfile(req, res, next) {
    try {
        const queryResult = await getUserByUsername(req.session.username);
        if (queryResult.length === 0) {
            return next(createError(500));
        }

        const user = queryResult[0];
        res.status(200).json({
            username: user["Username"],
            email: user["Email"],
            displayName: user["DisplayName"],
            gender: user["Gender"],
            birthdate: user["Birthdate"],
            location: user["Location"],
            relationshipStatus: user["RelationshipStatus"],
            profilePicture: user["ProfilePicture"],
            bio: user["Bio"]
        });
    } catch (error) {
        next(error);
    }
}

// FIXME: Users can create the same request twice, the recipient can create the request as well.
async function handleCreateFriendRequest(req, res, next) {
    const { value: payload, error } = createFriendRequestSchema.validate(req.body);
    
    if (error) {
        return next(createError(400, error.details[0].message));
    }
    
    const senderUsername = req.params.username;
    const recipientUsername = payload.recipientUsername;

    try {
        await createFriendRequest(senderUsername, recipientUsername);

        res.status(201).json({
            message: "Friend request sent."
        });
    } catch (error) {
        next(error);
    }
}

async function handleDeleteFriendRequest(req, res, next) {    
    const senderUsername = req.params.username;
    const recipientUsername = req.params.recipientUsername;

    try {
        await deleteFriendRequest(senderUsername, recipientUsername);

        res.status(200).json({
            message: "Friend request deleted."
        });
    } catch (error) {
        next(error);
    }
}

async function handleDeclineFriendRequest(req, res, next) {    
    const recipientUsername = req.params.username;
    const senderUsername = req.params.senderUsername;

    try {
        await deleteFriendRequest(senderUsername, recipientUsername);

        res.status(200).json({
            message: "Friend request declined."
        });
    } catch (error) {
        next(error);
    }
}

async function handleGetFriendsOfUser(req, res, next) {
    const username = req.params.username;
    const pageNumber = +req.query.pageNumber || 1;

    try {
        const users = await getFriendsOfUser(username, pageNumber);

        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
}

async function handleAcceptFriendRequest(req, res, next) {
    const recipientUsername = req.params.username;
    const senderUsername = req.params.senderUsername;

    try {
        await acceptFriendRequest(senderUsername, recipientUsername);

        res.status(200).json({
            message: "Friend request accepted."
        });
    } catch (error) {
        next(error);
    }
}

async function handleUnfriend(req, res, next) {
    const username = req.params.username;
    const friendUsername = req.params.friendUsername;

    try {
        await deleteFriendship(username, friendUsername);

        res.status(200).json({
            message: `Unfriended with user ${friendUsername}.`
        });
    } catch (error) {
        next(error);
    }
}

async function handleUpdateMyProfile(req, res, next) {

}

async function handleGetUser(req, res, next) {
    const username = req.params.username;

    try {
        const user = await getUserAndFriendshipStatus(req.session.userId, username);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

async function handleGetUsers(req, res, next) {
    const pageNumber = req.query.pageNumber || 1;
    const nameQuery = req.query.nameQuery || "";
    const location = req.query.location || "";
    const relationshipStatus = req.query.relationshipStatus || "";

    try {
        const users = await getUsersAndFriendshipStatus(req.session.userId, pageNumber, nameQuery, location, relationshipStatus);
        res.status(200).json({
            users
        });
    } catch (error) {
        next(error);
    }
}

async function handleGetReceivedRequests(req, res, next) {
    const username = req.params.username;

    try {
        const requests = await getReceivedFriendRequests(username);
        res.status(200).json({
            requests
        });
    } catch (error) {
        next(error);
    }
}

async function handleGetSentRequests(req, res, next) {
    const username = req.params.username;

    try {
        const requests = await getSentFriendRequests(username);
        res.status(200).json({
            requests
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    handleGetMyProfile,
    handleGetUser,
    handleGetUsers,
    handleUpdateMyProfile,
    handleCreateFriendRequest,
    handleDeleteFriendRequest,
    handleDeclineFriendRequest,
    handleAcceptFriendRequest,
    handleUnfriend,
    handleGetFriendsOfUser,
    handleGetReceivedRequests,
    handleGetSentRequests
};