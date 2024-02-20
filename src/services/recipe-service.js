const prisma = require("../models/prisma");

exports.createRecipe = (data) => prisma.recipe.create({ data });

exports.findRecipeByUserIdAndName = (userId, name) =>
  prisma.recipe.findFirst({
    where: { userId, name },
    orderBy: {
      createdAt: "desc",
    },
  });

exports.findRecipes = () =>
  prisma.recipe.findMany({
    include: {
      infos: {
        select: {
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

exports.findRecipeByRecipeId = (recipeId) =>
  prisma.recipe.findFirst({
    where: { id: +recipeId },
    include: {
      infos: true,
      ingredients: true,
      instructions: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

exports.findRecipesByUserId = (userId) =>
  prisma.recipe.findMany({
    where: { userId: +userId },
    include: { infos: { select: { image: true } } },
    orderBy: { createdAt: "desc" },
  });
