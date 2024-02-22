const Joi = require("joi");
const validate = require("./validate");

const userProfileSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]{6,}$/)
    .trim()
    .messages({
      "string.empty": "NAME is required",
      "any.required": "NAME is required",
      "string.pattern.base":
        "NAME must be at least 6 characters and contains only alphabet",
    }),
});

const validateUserProfile = validate(userProfileSchema);

module.exports = validateUserProfile;
