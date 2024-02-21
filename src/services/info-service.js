const prisma = require("../models/prisma");

exports.createInfo = (data) => prisma.info.create({ data });

exports.updateInfo = (recipeId, data) =>
  prisma.info.updateMany({ where: { recipeId }, data });
