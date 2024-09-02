const pool = require("../services/pool");

async function getUsersAndFriendshipStatus(currentUserId, pageNumber = 1, nameQuery = "", location = "", relationshipStatus = "") {
    try {
        const sql = `
            SELECT * FROM \`User\`
            LEFT JOIN (SELECT * FROM \`Friendship\` WHERE \`UserA\` = ? OR \`UserB\` = ?) AS \`UserARelationships\`
            ON (\`User\`.\`UserID\` = \`UserARelationships\`.\`UserA\` OR \`User\`.\`UserID\` = \`UserARelationships\`.\`UserB\`)
            WHERE \`UserID\` != ? ${nameQuery ? `AND (\`Username\` LIKE ? OR \`DisplayName\` LIKE ?)` : ""}
            ${location ? `AND \`Location\` = ?` : ""}
            ${relationshipStatus ? `AND \`RelationshipStatus\` = ?` : ""}
            LIMIT ?, 20
        `;
        const values = [currentUserId, currentUserId, currentUserId];
        nameQuery && values.push(`%${nameQuery}%`, `%${nameQuery}%`);
        location && values.push(location);
        relationshipStatus && values.push(relationshipStatus);
        values.push(String((pageNumber - 1) * 20));

        const [result, _] = await pool.execute(sql, values);

        const users = result.map(user => ({
            userId: user["UserID"],
            username: user["Username"],
            email: user["Email"],
            displayName: user["DisplayName"],
            gender: user["Gender"],
            birthdate: user["Birthdate"],
            location: user["Location"],
            relationshipStatus: user["RelationshipStatus"],
            profilePicture: user["ProfilePicture"],
            bio: user["Bio"],
            status: getRelationshipType(currentUserId, user["UserA"], user["UserB"], user["Status"])
        }));
        return users;
    } catch (error) {
        throw error;
    }
}

function getRelationshipType(currentUserId, userA, userB, status) {
    if (status === "Accepted") {
        return "Friends";
    }

    if (status === "Pending" && currentUserId === userA) {
        return "Request sent";
    }

    if (status === "Pending" && currentUserId === userB) {
        return "Request received";
    }

    return "Not friend";
}

async function getUserAndFriendshipStatus(currentUserId, targetUsername) {
    try {
        const sql = `
            SELECT * FROM \`User\`
            LEFT JOIN (SELECT * FROM \`Friendship\` WHERE \`UserA\` = ? OR \`UserB\` = ?) AS \`UserARelationships\`
            ON (\`User\`.\`UserID\` = \`UserARelationships\`.\`UserA\` OR \`User\`.\`UserID\` = \`UserARelationships\`.\`UserB\`)
            WHERE \`Username\` = ?;
        `;
        const values = [currentUserId, currentUserId, targetUsername];

        const [result, _] = await pool.execute(sql, values);
        const userRow = result[0];

        console.log(userRow);

        const user = {
            userId: userRow["UserID"],
            username: userRow["Username"],
            email: userRow["Email"],
            displayName: userRow["DisplayName"],
            gender: userRow["Gender"],
            birthdate: userRow["Birthdate"],
            location: userRow["Location"],
            relationshipStatus: userRow["RelationshipStatus"],
            profilePicture: userRow["ProfilePicture"],
            bio: userRow["Bio"],
            status: getRelationshipType(currentUserId, userRow["UserA"], userRow["UserB"], userRow["Status"])
        };
        return user;
    } catch (error) {
        throw error;
    }
}

async function getFriendsOfUser(username, pageNumber = 1) {
    try {
        const sql = `
            SELECT * FROM \`User\`
            JOIN \`Friendship\` ON \`User\`.\`UserID\` = \`Friendship\`.\`UserA\` OR \`User\`.\`UserID\` = \`Friendship\`.\`UserB\`
            WHERE \`Username\` != ? AND \`Status\` = "Accepted" AND (\`UserA\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?) OR \`UserB\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?))
            LIMIT ?, 20
        `;
        const values = [username, username, username, String((pageNumber - 1) * 20)];
        const [result, _] = await pool.execute(sql, values);
        const users = result.map(user => ({
            userId: user["UserID"],
            username: user["Username"],
            email: user["Email"],
            displayName: user["DisplayName"],
            gender: user["Gender"],
            birthdate: user["Birthdate"],
            location: user["Location"],
            relationshipStatus: user["RelationshipStatus"],
            profilePicture: user["ProfilePicture"],
            bio: user["Bio"]
        }));
        return users;
    } catch (error) {
        throw error;
    }
}

async function createFriendRequest(requesterUsername, recipientUsername) {
    try {
        const sql = `
            INSERT INTO \`Friendship\` VALUES (
                (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?),
                (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?),
                "Pending"
            )
        `;
        await pool.execute(sql, [requesterUsername, recipientUsername]);
    } catch (error) {
        throw error;
    }
}

async function deleteFriendRequest(requesterUsername, recipientUsername) {
    try {
        const sql = `
            DELETE FROM \`Friendship\` WHERE 
                \`UserA\` = (SELECT UserID FROM \`User\` WHERE Username = ?) AND
                \`UserB\` = (SELECT UserID FROM \`User\` WHERE Username = ?) AND
                \`Status\` = "Pending"
        `;
        await pool.execute(sql, [requesterUsername, recipientUsername]);
    } catch (error) {
        throw error;
    }
}

async function acceptFriendRequest(requesterUsername, recipientUsername) {
    try {
        const sql = `
            UPDATE \`Friendship\` SET \`Status\` = "Accepted" WHERE 
                \`UserA\` = (SELECT UserID FROM \`User\` WHERE Username = ?) AND
                \`UserB\` = (SELECT UserID FROM \`User\` WHERE Username = ?)
        `;
        await pool.execute(sql, [requesterUsername, recipientUsername]);
    } catch (error) {
        throw error;
    }
}

async function deleteFriendship(username, friendUsername) {
    try {
        let [result, _] = await pool.execute("SELECT `UserID` FROM `User` WHERE `Username` = ? OR `Username` = ?", [username, friendUsername]);
        const userIds = result.map(r => r["UserID"]);

        const sql = `
            DELETE FROM \`Friendship\` WHERE 
                ((\`UserA\` = ? AND \`UserB\` = ?) OR
                (\`UserA\` = ? AND \`UserB\` = ?)) AND
                \`Status\` = "Accepted"
        `;
        await pool.execute(sql, [userIds[0], userIds[1], userIds[1], userIds[0]]);
    } catch (error) {
        throw error;
    }
}

async function getSentFriendRequests(senderUsername) {
    try {
        const sql = `
            SELECT \`UserID\`, \`Username\`, \`DisplayName\`, \`Gender\`, \`Birthdate\`, \`Location\`, \`RelationshipStatus\`, \`ProfilePicture\`, \`Bio\` FROM \`User\`
            JOIN \`Friendship\` ON \`User\`.\`UserID\` = \`Friendship\`.\`UserB\`
            WHERE \`UserA\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?) AND \`Status\` = "Pending";
        `;
        const values = [senderUsername];
        const [result, _] = await pool.execute(sql, values);

        const requests = result.map(request => ({
            userId: request["UserID"],
            username: request["Username"],
            displayName: request["DisplayName"],
            gender: request["Gender"],
            birthdate: request["Birthdate"],
            location: request["Location"],
            relationshipStatus: request["RelationshipStatus"],
            profilePicture: request["ProfilePicture"],
            bio: request["Bio"],
            status: "Request sent"
        }));
        return requests;
    } catch (error) {
        throw error;
    }
}

async function getReceivedFriendRequests(recipientUsername) {
    try {
        const sql = `
            SELECT \`UserID\`, \`Username\`, \`DisplayName\`, \`Gender\`, \`Birthdate\`, \`Location\`, \`RelationshipStatus\`, \`ProfilePicture\`, \`Bio\` FROM \`User\`
            JOIN \`Friendship\` ON \`User\`.\`UserID\` = \`Friendship\`.\`UserA\`
            WHERE \`UserB\` = (SELECT \`UserID\` FROM \`User\` WHERE \`Username\` = ?) AND \`Status\` = "Pending";
        `;
        const values = [recipientUsername];
        const [result, _] = await pool.execute(sql, values);

        const requests = result.map(request => ({
            userId: request["UserID"],
            username: request["Username"],
            displayName: request["DisplayName"],
            gender: request["Gender"],
            birthdate: request["Birthdate"],
            location: request["Location"],
            relationshipStatus: request["RelationshipStatus"],
            profilePicture: request["ProfilePicture"],
            bio: request["Bio"],
            status: "Request received"
        }));
        return requests;
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const sql = "SELECT * FROM User WHERE Username = ?";
        const [result, _] = await pool.execute(sql, [username]);

        return result;
    } catch (error) {
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const sql = "SELECT * FROM User WHERE Email = ?";
        const [result, _] = await pool.execute(sql, [email]);

        return result;
    } catch (error) {
        throw error;
    }
}

async function createUser(user) {
    let {
        username,
        email,
        password,
        displayName,
        gender,
        birthdate,
        location,
        relationshipStatus,
        bio
    } = user;
    birthdate = birthdate.split("T")[0];

    try {
        const sql = "INSERT INTO User (Username, Email, Password, DisplayName, Gender, Birthdate, Location, RelationshipStatus, Bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [username, email, password, displayName, gender, birthdate, location, relationshipStatus, bio];
        const [queryResult, _] = await pool.execute(sql, values);
        
        return queryResult;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUsersAndFriendshipStatus,
    getUserByUsername,
    getUserByEmail,
    createUser,
    createFriendRequest, 
    deleteFriendRequest,
    acceptFriendRequest,
    getSentFriendRequests,
    getReceivedFriendRequests,
    deleteFriendship,
    getFriendsOfUser,
    getUserAndFriendshipStatus
};