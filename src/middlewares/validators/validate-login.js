const Joi = require("joi");
const validate = require("./validate");

const loginSchema = Joi.object({
  email: Joi.string().required().trim().messages({
    "string.empty": "EMAIL is required",
    "any.required": "EMAIL is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "PASSWORD is required",
    "any.required": "PASSWORD is required",
  }),
});

const validateLogin = validate(loginSchema);

module.exports = validateLogin;
