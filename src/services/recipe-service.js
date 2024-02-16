const prisma = require("../models/prisma");

exports.createRecipe = (data) => prisma.recipe.create({ data });

exports.findRecipeByUserIdAndName = (userId, name) =>
  prisma.recipe.findFirst({
    where: { userId, name },
    orderBy: {
      createdAt: "desc",
    },
  });
