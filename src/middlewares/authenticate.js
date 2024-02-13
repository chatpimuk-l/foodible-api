const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authenticate = catchError(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    createError("Invalid authorization header", 401);
  }
  const token = authorization.split(" ")[1];
  const payload = jwtService.verify(token);
  const user = await userService.findUserById(payload.userId);
  if (!user) {
    createError("User not found", 401);
  }
  delete user.password;

  req.user = user;
  next();
});

module.exports = authenticate;
