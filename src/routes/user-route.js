const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const {
  validateTargetUserId,
} = require("../middlewares/validators/validate-userId");

router.get(
  "/:targetUserId/profile",
  validateTargetUserId,
  userController.getUserProfileByTargetUserId
);

module.exports = router;
