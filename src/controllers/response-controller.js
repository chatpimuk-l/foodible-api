const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const responseService = require("../services/response-service");

exports.createResponse = catchError(async (req, res, next) => {
  const data = {
    userId: +req.user.id,
    recipeId: +req.params.recipeId,
    comment: req.body?.comment || null,
    rating: +req.body.rating,
  };
  const response = await responseService.createResponse(data);

  res.status(201).json({ response });
});

exports.getResponsesByRecipeId = catchError(async (req, res, next) => {
  const responses = await responseService.getResponsesByRecipeId(
    +req.params.recipeId
  );
  res.status(200).json({ responses });
});
