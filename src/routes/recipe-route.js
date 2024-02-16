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

module.exports = router;
