const { getPresignedGetUrl } = require("../services/bucket");
const pool = require("../services/pool");

async function getNewsFeed(username, pageNumber = 1) {
    try {
        const sql = `
            SELECT * FROM \`Post\`
            LEFT JOIN (SELECT * FROM \`Friendship\` WHERE \`UserA\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?) OR \`UserB\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?)) AS \`MyFriends\`
            ON \`Post\`.\`UserID\` = \`MyFriends\`.\`UserA\` OR \`Post\`.\`UserID\` = \`MyFriends\`.\`UserB\`
            WHERE \`UserID\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?) OR ((\`UserA\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?) OR \`UserB\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?)) AND \`Status\` = "Accepted")
            ORDER BY \`TimePosted\` DESC
            LIMIT ?, 20
        `;
        const [result, _] = await pool.execute(sql, [username, username, username, username, username, String((pageNumber - 1) * 20)]);
        return result;
    } catch (error) {
        throw error;
    }
}

async function createPost(userId, textContent, mediaFileIds) {
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const createPostSql = "INSERT INTO `Post` (`UserID`, `TextContent`, `TimePosted`) VALUES (?, ?, NOW())";
        const [queryResult, _] = await connection.execute(createPostSql, [userId, textContent]);
        
        const postId = queryResult.insertId;
        const createMediaSql = "INSERT INTO `PostMedia` (`PostID`, `MediaName`, `Order`) VALUES (?, ?, ?)";
        for (let [index, fileId] of mediaFileIds.entries()) {
            await connection.execute(createMediaSql, [postId, fileId, index]);
        }

        await connection.commit();        
        pool.releaseConnection(connection);

        return postId;
    } catch (error) {
        await connection.rollback();
        pool.releaseConnection(connection);
        throw error;
    }
}

async function getPostsFromUser(username, pageNumber = 1) {
    try {
        const sql = `
            SELECT \`PostID\` FROM \`Post\` 
            JOIN \`User\` ON \`Post\`.\`UserID\` = \`User\`.\`UserID\` 
            WHERE \`Username\` = ? 
            ORDER BY \`TimePosted\` DESC
            LIMIT ?, 10
        `;
        const [result, _] = await pool.execute(sql, [username, `${(pageNumber - 1) * 10}`]);
        return result;
    } catch (error) {
        throw error;
    }
}

async function getPost(postId) {
    try {
        const postSql = `
            SELECT \`DisplayName\`, \`Username\`, \`Post\`.\`PostID\` AS \`PostID\`, \`TimePosted\`, \`TextContent\`, \`MediaName\`, \`Order\` FROM \`Post\`
            JOIN \`User\` ON \`Post\`.\`UserID\` = \`User\`.\`UserID\`
            LEFT JOIN \`PostMedia\` ON \`Post\`.\`PostID\` = \`PostMedia\`.\`PostID\`
            WHERE \`Post\`.\`PostID\` = ?
            ORDER BY \`Order\`
        `;
        const [postResult,] = await pool.execute(postSql, [postId]);

        const reactionSql = `
            SELECT COUNT(\`ReactorID\`) AS \`ReactionCount\`, \`Reaction\` FROM \`PostReaction\` WHERE \`PostID\` = ? GROUP BY \`Reaction\`
        `;
        const [reactionResult,] = await pool.execute(reactionSql, [postId]);

        if (postResult.length === 0) {
            return null;
        } else {
            const postDetails = postResult[0];
            const mediaFileNames = postResult.filter(row => row["MediaName"] !== null).map(media => media["MediaName"]);
            const mediaFileUrls = [];

            for (const fileName of mediaFileNames) {
                const url = await getPresignedGetUrl(fileName);
                mediaFileUrls.push(url);
            }

            const reactionTypes = { };
            reactionResult.forEach(reaction => reactionTypes[reaction["Reaction"]] = reaction["ReactionCount"]);

            const post = {
                author: {
                    username: postDetails["Username"],
                    displayName: postDetails["DisplayName"]
                },
                postId: postDetails["PostID"],
                timePosted: postDetails["TimePosted"],
                textContent: postDetails["TextContent"],
                media: mediaFileUrls,
                reactions: {
                    likes: reactionTypes["Like"] ?? 0,
                    dislikes: reactionTypes["Dislike"] ?? 0
                }
            };

            return post;
        }
    } catch (error) {
        throw error;
    }
}

async function getSingleReactionToPost(postId, username) {
    try {
        const sql = `
            SELECT \`Reaction\` FROM \`PostReaction\` WHERE \`PostID\` = ? AND \`ReactorID\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?)
        `;
        const [result,] = await pool.execute(sql, [postId, username]);
        
        if (result.length === 0) {
            return "None";
        } else {
            return result[0]["Reaction"];
        }
    } catch (error) {
        throw error;
    }
}

async function createReaction(postId, username, type) {
    try {
        const sql = `
            INSERT INTO \`PostReaction\` (\`PostID\`, \`ReactorID\`, \`Reaction\`)
	        VALUES (?, (SELECT \`UserID\` AS \`ReactorID\` FROM \`User\` WHERE \`Username\` = ?), ?)
            ON DUPLICATE KEY UPDATE \`Reaction\` = ?
        `;
        const values = [postId, username, type, type];
        await pool.execute(sql, values);
    } catch (error) {
        throw error;
    }
}

async function deleteReaction(postId, username) {
    try {
        const sql = `
            DELETE FROM \`PostReaction\` WHERE \`PostID\` = ? AND \`ReactorID\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?);
        `;
        const values = [postId, username];
        await pool.execute(sql, values);
    } catch (error) {
        throw error;
    }
}

async function editPost(postId, textContent) {
    try {
        const sql = `
            UPDATE \`Post\` SET \`TextContent\` = ? WHERE \`PostID\` = ?
        `;
        const values = [textContent, postId];
        await pool.execute(sql, values);
    } catch (error) {
        throw error;
    }
}

async function deletePost(postId) {
    try {
        const sql = `
            DELETE FROM \`Post\` WHERE \`PostID\` = ?
        `;
        const values = [postId];
        await pool.execute(sql, values);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPost,
    getPostsFromUser,
    getPost,
    createReaction, 
    deleteReaction,
    getSingleReactionToPost,
    getNewsFeed,
    editPost,
    deletePost
}