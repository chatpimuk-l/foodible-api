const fs = require("fs/promises");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const uploadService = require("../services/upload-service");
const validateUserProfile = require("../utils/validations/validate-user-profile");

exports.getUserProfileByTargetUserId = catchError(async (req, res, next) => {
  const userProfile = await userService.findUserProfileByTargetUserId(
    req.targetUserId
  );

  delete userProfile.password;
  res.status(200).json({ userProfile });
});

exports.updateUserProfile = catchError(async (req, res, next) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = await uploadService.upload(req.file.path);
    fs.unlink(req.file.path);
  }
  validateUserProfile(req.body);

  await userService.updateUser(req.user.id, data);
  res.status(200).json({ data });
});
