const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const favService = require("../services/fav-service");

exports.handleFav = catchError(async (req, res, next) => {
  const userId = +req.user.id;
  const recipeId = +req.params.recipeId;

  const isFav = await favService.findFav(userId, recipeId);
  console.log("isFav", isFav);

  if (isFav) {
    await favService.removeFav(userId, recipeId);
    res.status(204).json({ message: "removed" });
  } else {
    const fav = await favService.addFav(userId, recipeId);
    res.status(201).json({ fav });
  }
});
