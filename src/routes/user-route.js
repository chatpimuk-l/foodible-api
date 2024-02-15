const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const {
  validateTargetUserId,
  validateMyTargetUserId,
} = require("../middlewares/validators/validate-userId");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");

router.get(
  "/:targetUserId/profile",
  validateTargetUserId,
  userController.getUserProfileByTargetUserId
);

router.patch(
  "/",
  authenticate,
  upload.single("image"),
  userController.updateUserProfile
);

module.exports = router;
