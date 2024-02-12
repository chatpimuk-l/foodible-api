const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
  const existedUser = await userService.findUserByEmail(req.body.email);
  if (existedUser) {
    createError("User already existed", 400);
  }

  req.body.password = await hashService.hash(req.body.password);
  const user = await userService.createUser(req.body);
  const payload = { userId: user.id };
  const accessToken = jwtService.sign(payload);
  delete user.password;

  res.status(201).json({ accessToken, user });
});

exports.login = catchError(async (req, res, next) => {});
