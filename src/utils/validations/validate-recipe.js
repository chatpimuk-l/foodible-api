const Joi = require("joi");

module.exports = validateRecipe = (reqBody) => {
  const recipeSchema = Joi.object({
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
    description: Joi.string().trim(),
    prepTime: Joi.number().integer().required().messages({
      "string.empty": "PREP TIME is required",
      "any.required": "PREP TIME is required",
      "number.base": "PREP TIME must be a number",
      "number.integer": "PREP TIME must be an integer",
    }),
    cookTime: Joi.number().integer().required().messages({
      "string.empty": "COOK TIME is required",
      "any.required": "COOK TIME is required",
      "number.base": "COOK TIME must be a number",
      "number.integer": "COOK TIME must be an integer",
    }),
    serving: Joi.number().required().messages({
      "string.empty": "SERVINGS is required",
      "any.required": "SERVINGS is required",
      "number.base": "SERVINGS must be a number",
    }),
    tip: Joi.string().trim(),
    image: Joi.required().messages({
      "string.empty": "IMAGE is required",
      "any.required": "IMAGE is required",
    }),
    ingredients: Joi.array().items(
      Joi.object()
        .keys({
          ingredient: Joi.string().required().trim().messages({
            "string.empty": "INGREDIENT is required",
            "any.required": "INGREDIENT is required",
          }),
          amount: Joi.number().required().messages({
            "string.empty": "AMOUNT is required",
            "any.required": "AMOUNT is required",
            "number.base": "AMOUNT must be a number",
          }),
          unit: Joi.string().required().trim().messages({
            "string.empty": "UNIT is required",
            "any.required": "UNIT is required",
          }),
        })
        .unknown(true)
    ),
    instructions: Joi.array().items(
      Joi.object()
        .keys({
          instruction: Joi.string().required().trim().messages({
            "string.empty": "INSTRUCTION is required",
            "any.required": "INSTRUCTION is required",
          }),
        })
        .unknown(true)
    ),
  }).unknown(true);

  const { error, value } = recipeSchema.validate(reqBody);

  if (error) {
    throw error;
  }
};
