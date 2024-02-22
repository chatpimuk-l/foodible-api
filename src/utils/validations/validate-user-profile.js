const Joi = require("joi");

module.exports = validateUserProfile = (reqBody) => {
  const userProfileSchema = Joi.object({
    name: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]{3,}$/)
      .trim()
      .messages({
        "string.empty": "NAME is required",
        "any.required": "NAME is required",
        "string.pattern.base":
          "NAME must be at least 3 characters and contains only alphabet",
      }),
  }).unknown(true);

  const { error, value } = userProfileSchema.validate(reqBody);

  if (error) {
    throw error;
  }
};
