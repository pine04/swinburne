const Joi = require("joi");

const registrationSchema = Joi.object({
    username: Joi.string().pattern(new RegExp("^[a-zA-Z0-9_]*$")).max(30).required().messages({
        "any.required": "Username is required.",
        "string.empty": "Username cannot be empty.",
        "string.pattern.base":
            "Username can only consist of alphanumeric characters and underscores.",
        "string.max": "The maximum length for username is 30 characters."
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Email is invalid."
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required().messages({
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty.",
        "string.pattern.base":
            "Password must consist of alphanumeric characters and be between 8 and 30 characters in length."
    }),
    cfPassword: Joi.string().equal(Joi.ref("password")).required().messages({
        "any.required": "Confirm password is required.",
        "any.only": "Confirm password does not match password."
    }),
    displayName: Joi.string().max(50).required().messages({
        "any.required": "Display name is required.",
        "string.empty": "Display name cannot be empty.",
        "string.max": "The maximum length for display name is 50 characters."
    }),
    gender: Joi.string().valid("Male", "Female", "Non-binary", "Undisclosed").required().messages({
        "any.required": "Gender is required.",
        "any.only": "Gender must be one of 'Male', 'Female', 'Non-binary', or 'Undisclosed'."
    }),
    birthdate: Joi.string().isoDate().required().messages({
        "any.required": "Birthdate is required.",
        "string.empty": "Birthdate cannot be empty.",
        "string.isoDate": "Birthdate must be in ISO 8601 date format."
    }),
    location: Joi.string().allow("").max(100).default("").messages({
        "string.max": "The maximum length for location is 100 characters."
    }),
    relationshipStatus: Joi.string().valid("Single", "Dating", "Engaged", "Married", "Undisclosed").default("Undisclosed").messages({
        "any.only": "Relationship status must be one of 'Single', 'Dating', 'Engaged', 'Married', 'Undisclosed'."
    }),
    bio: Joi.string().allow("").max(255).default("").messages({
        "string.max": "The maximum length for bio is 255 characters."
    })
});

const loginSchema = Joi.object({
    usernameOrEmail: Joi.alternatives(
        Joi.string().pattern(new RegExp("^[a-zA-Z0-9_]*$")).max(30).artifact("username"),
        Joi.string().email().artifact("email")
    ).required().messages({
        "any.required": "Username or email is required.",
        "alternatives.match": "usernameOrEmail is neither a valid username nor a valid email."
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty."
    })
});

module.exports = {
    registrationSchema,
    loginSchema
};
