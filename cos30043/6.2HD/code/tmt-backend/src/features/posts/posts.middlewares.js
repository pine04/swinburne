const createError = require("http-errors");

const { createPostSchema } = require("./posts.schemas");
const { createPost, getPostsFromUser, getPost, createReaction, deleteReaction, getSingleReactionToPost, getNewsFeed, editPost, deletePost } = require("../../models/post");
const { getPresignedPutUrl } = require("../../services/bucket");
const { getUniqueNameForFile } = require("../../services/uuid");

async function handleCreatePost(req, res, next) {

    const { value: post, error } = createPostSchema.validate(req.body);
    
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const userId = req.session.userId;
    const uniqueMediaFileIds = post.mediaFiles.map(fileName => getUniqueNameForFile(fileName));

    try {
        const postId = await createPost(userId, post.textContent, uniqueMediaFileIds);
        const uploadUrls = [];

        for (const fileId of uniqueMediaFileIds) {
            const url = await getPresignedPutUrl(fileId);
            uploadUrls.push(url);
        }

        res.status(201).json({
            message: "Post created successfully.",
            resourceUrl: `/api/posts/${postId}`,
            mediaUploadUrls: uploadUrls.map((url, index) => ({
                file: post.mediaFiles[index],
                url: url
            }))
        });
    } catch (error) {
        return next(error);
    }
}

// TODO: Separate getting current user's reaction to another middleware?
async function handleGetPost(req, res, next) {
    const postId = req.params.postId;
    const username = req.session.username;

    try {
        const post = await getPost(postId);
        const reaction = await getSingleReactionToPost(postId, username);
        res.status(200).json({
            post, reaction
        });    
    } catch (error) {
        return next(error);
    }
}

async function handleEditPost(req, res, next) {
    const postId = req.params.postId;
    const textContent = req.body.textContent;

    try {
        await editPost(postId, textContent);
        res.status(200).json({
            message: "Post successfully edited."
        });
    } catch (error) {
        return next(error);
    }
}

async function handleDeletePost(req, res, next) {
    const postId = req.params.postId;
    
    try {
        await deletePost(postId);
        res.status(200).json({
            message: "Post successfully deleted."
        });
    } catch (error) {
        return next(error);
    }
}

async function handleGetNewsFeed(req, res, next) {
    const username = req.params.username;
    const pageNumber = req.query.pageNumber || 1;

    try {
        const posts = await getNewsFeed(username, pageNumber);
        res.status(200).json({
            posts: posts.map(post => `/api/posts/${post["PostID"]}`),
            nextPage: `/api/users/${username}/news-feed?pageNumber=${+pageNumber + 1}`
        });    
    } catch (error) {
        return next(error);
    }
}

async function handleGetPostsFromUser(req, res, next) {
    const username = req.params.username;
    const pageNumber = req.query.pageNumber || 1;

    try {
        const posts = await getPostsFromUser(username, pageNumber);
        res.status(200).json({
            posts: posts.map(post => `/api/posts/${post["PostID"]}`),
            nextPage: `/api/users/${username}/posts?pageNumber=${+pageNumber + 1}`
        });    
    } catch (error) {
        return next(error);
    }
}

async function handlePutReaction(req, res, next) {
    const postId = req.params.postId;
    const username = req.params.username;
    const reaction = req.body.reaction;

    try {
        await createReaction(postId, username, reaction);
        res.status(201).json({
            message: "Successfully created reaction to post."
        });
    } catch (error) {
        return next(error);
    }
}

async function handleDeleteReaction(req, res, next) {
    const postId = req.params.postId;
    const username = req.params.username;

    try {
        await deleteReaction(postId, username);
        res.status(200).json({
            message: "Successfully removed reaction from post."
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    handleCreatePost,
    handleGetPost,
    handleGetNewsFeed,
    handleGetPostsFromUser,
    handlePutReaction,
    handleDeleteReaction,
    handleEditPost,
    handleDeletePost
}