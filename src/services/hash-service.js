const bycrypt = require("bcryptjs");

exports.hash = (plainText) => bycrypt.hash(plainText, 12);
exports.compare = (plainText, hashPassword) =>
  bycrypt.compare(plainText, hashPassword);
