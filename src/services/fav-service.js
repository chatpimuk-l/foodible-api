const prisma = require("../models/prisma");

exports.addFav = (userId, recipeId) =>
  prisma.fav.create({ data: { userId: +userId, recipeId: +recipeId } });

exports.findFav = (userId, recipeId) =>
  prisma.fav.findFirst({
    where: { AND: [{ userId: +userId }, { recipeId: +recipeId }] },
  });

exports.removeFav = (userId, recipeId) =>
  prisma.fav.deleteMany({
    where: { AND: [{ userId: +userId }, { recipeId: +recipeId }] },
  });
