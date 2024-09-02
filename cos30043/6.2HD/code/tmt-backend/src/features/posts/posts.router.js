const express = require("express");
const {
    handleCreatePost,
    handleGetNewsFeed,
    handleGetPost,
    handleGetPostsFromUser,
    handlePutReaction,
    handleDeleteReaction,
    handleEditPost,
    handleDeletePost
} = require("./posts.middlewares");

const { requireAuthentication } = require("../../utils/helpers");

const router = express.Router();

router.post("/posts", requireAuthentication, handleCreatePost);
router.get("/posts/:postId", requireAuthentication, handleGetPost);
router.patch("/posts/:postId", requireAuthentication, handleEditPost);
router.delete("/posts/:postId", requireAuthentication, handleDeletePost);
router.put("/posts/:postId/reactions/:username", requireAuthentication, handlePutReaction);
router.delete("/posts/:postId/reactions/:username", requireAuthentication, handleDeleteReaction);
router.get("/users/:username/posts", requireAuthentication, handleGetPostsFromUser);
router.get("/users/:username/news-feed", requireAuthentication, handleGetNewsFeed);

module.exports = router;