const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const recipeController = require("../controllers/recipe-controller");

router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "recipeImage", maxCount: 1 },
    { name: "instructionImage" },
  ]),
  recipeController.createRecipe
);
router.put(
  "/:recipeId",
  authenticate,
  upload.fields([
    { name: "recipeImage", maxCount: 1 },
    { name: "instructionImage" },
  ]),
  recipeController.updateRecipe
);
router.delete("/:recipeId", authenticate, recipeController.deleteRecipe);

router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeByRecipeId);
router.get("/users/:userId", recipeController.getRecipeByUserId);
router.get("/favs/:userId", recipeController.getRecipeByUserIdFav);

module.exports = router;
