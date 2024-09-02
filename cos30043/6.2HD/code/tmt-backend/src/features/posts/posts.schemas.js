const Joi = require("joi");

const createPostSchema = Joi.object({
    textContent: Joi.string().max(255).required().messages({
        "any.required": "'textContent' is required.",
        "string.empty": "'textContent' cannot be empty.",
        "string.max": "The maximum length for 'textContent' is 255 characters."
    }),
    mediaFiles: Joi.array().items(Joi.string()).max(10).messages({
        "string.base": "'mediaFiles' must be an array of file names.",
        "array.max": "'mediaFiles' can only contain at most 10 file names."
    })
});

module.exports = {
    createPostSchema
}