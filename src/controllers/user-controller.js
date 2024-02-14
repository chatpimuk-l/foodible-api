const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");

exports.getUserProfileByTargetUserId = catchError(async (req, res, next) => {
  const userProfile = await userService.findUserProfileByTargetUserId(
    req.targetUserId
  );

  delete userProfile.password;
  res.status(200).json({ userProfile });
});
