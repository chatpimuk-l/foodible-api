const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY || "banana";
const EXPIRE = process.env.JWT_EXPIRE;

exports.sign = (payload) =>
  jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRE });

exports.verify = (token) => jwt.verify(token, SECRET_KEY);
