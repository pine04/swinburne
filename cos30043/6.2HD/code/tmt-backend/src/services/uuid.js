const { v4: uuid } = require("uuid");

function getUniqueId() {
    return uuid();
}

function getUniqueNameForFile(fileName) {
    const extension = fileName.split(".").at(-1).trim();
    return getUniqueId() + "." + extension;
}

module.exports = {
    getUniqueId,
    getUniqueNameForFile
};