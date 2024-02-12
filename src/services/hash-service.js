const bycrypt = require("bcryptjs");

exports.hash = (plainText) => bycrypt.hash(plainText, 12);
