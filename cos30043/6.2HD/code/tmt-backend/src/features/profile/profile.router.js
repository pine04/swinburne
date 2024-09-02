const express = require("express");
const {
    handleGetMyProfile,
    handleUpdateMyProfile,
    handleGetUser,
    handleGetUsers,
    handleCreateFriendRequest,
    handleDeleteFriendRequest,
    handleDeclineFriendRequest,
    handleAcceptFriendRequest,
    handleUnfriend,
    handleGetFriendsOfUser,
    handleGetReceivedRequests,
    handleGetSentRequests
} = require("./profile.middlewares");
const { requireAuthentication } = require("../../utils/helpers");

const router = express.Router();

router.get("/my-profile", requireAuthentication, handleGetMyProfile);
router.patch("/my-profile", requireAuthentication, handleUpdateMyProfile);

router.get("/users", requireAuthentication, handleGetUsers);
router.get("/users/:username", requireAuthentication, handleGetUser);
router.get("/users/:username/friends", requireAuthentication, handleGetFriendsOfUser);

router.get("/users/:username/friend-requests/sent", requireAuthentication, handleGetSentRequests);
router.post("/users/:username/friend-requests/sent", requireAuthentication, handleCreateFriendRequest);
router.delete("/users/:username/friend-requests/sent/:recipientUsername", requireAuthentication, handleDeleteFriendRequest);

router.get("/users/:username/friend-requests/received", requireAuthentication, handleGetReceivedRequests);
router.post("/users/:username/friend-requests/received/:senderUsername/accept", requireAuthentication, handleAcceptFriendRequest);
router.delete("/users/:username/friend-requests/received/:senderUsername", requireAuthentication, handleDeclineFriendRequest);

router.delete("/users/:username/friends/:friendUsername", requireAuthentication, handleUnfriend);

module.exports = router;