const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

async function hash(data) {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    } catch (error) {
        throw error;
    }
}

async function compare(data, encrypted) {
    try {
        const result = await bcrypt.compare(data, encrypted);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    hash,
    compare
};
