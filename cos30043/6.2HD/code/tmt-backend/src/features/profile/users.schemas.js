const Joi = require("joi");

const createFriendRequestSchema = Joi.object({
    recipientUsername: Joi.string().required().messages({
        "any.required": "'recipientUsername' is required.",
        "string.empty": "'recipientUsername' cannot be empty."
    })
});

module.exports = {
    createFriendRequestSchema
}