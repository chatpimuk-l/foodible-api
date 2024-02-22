const express = require("express");
const router = express.Router();

// const userController = require("../controllers/user-controller");
const responseController = require("../controllers/response-controller");
// const {
//   validateTargetUserId,
// } = require("../middlewares/validators/validate-userId");
// const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");

router.post("/:recipeId", authenticate, responseController.createResponse);
router.get("/:recipeId", responseController.getResponsesByRecipeId);

module.exports = router;
