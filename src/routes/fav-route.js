const express = require("express");
const router = express.Router();

const favController = require("../controllers/fav-controller");
// const {
//   validateTargetUserId,
// } = require("../middlewares/validators/validate-userId");
const authenticate = require("../middlewares/authenticate");

router.post("/:recipeId", authenticate, favController.handleFav);

module.exports = router;
