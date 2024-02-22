const prisma = require("../models/prisma");

exports.createRecipe = (data) => prisma.recipe.create({ data });

exports.updateRecipe = (recipeId, name) =>
  prisma.recipe.update({ where: { id: recipeId }, data: { name } });

exports.deleteRecipe = (recipeId) =>
  prisma.recipe.delete({ where: { id: recipeId } });

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

exports.findRecipesByRecipeName = (name) =>
  prisma.recipe.findMany({
    where: { name: { contains: name } },
    include: { infos: { select: { image: true } } },
    orderBy: { createdAt: "desc" },
  });

exports.findRecipesByInclude = (include) => {
  const newInclude = include.substring(1, include.length - 1);
  console.log("newInclude", newInclude);
  console.log("(newInclude)", `(${newInclude})`);

  return prisma.$queryRaw`SELECT * FROM (SELECT ing.recipe_id, COUNT(recipe_id) count FROM recipes r JOIN ingredients ing ON r.id = ing.recipe_id WHERE ing.ingredient IN ('malago', 'carrot', 'moogrop') GROUP BY ing.recipe_id ORDER BY count DESC) dt JOIN recipes r ON dt.recipe_id = r.id JOIN infos inf ON dt.recipe_id = inf.recipe_id JOIN ingredients ing ON dt.recipe_id = ing.recipe_id WHERE ing.ingredient IN ('malago', 'carrot', 'moogrop')`;
};

// return prisma.$queryRaw`SELECT * FROM (SELECT ing.recipe_id, COUNT(recipe_id) count FROM recipes r JOIN ingredients ing ON r.id = ing.recipe_id WHERE ing.ingredient IN (${newInclude}) GROUP BY ing.recipe_id ORDER BY count DESC) dt JOIN recipes r ON dt.recipe_id = r.id JOIN infos inf ON dt.recipe_id = inf.recipe_id JOIN ingredients ing ON dt.recipe_id = ing.recipe_id WHERE ing.ingredient IN (${newInclude})`;
// SELECT * FROM (SELECT ing.recipe_id, COUNT(recipe_id) count FROM recipes r JOIN ingredients ing ON r.id = ing.recipe_id WHERE ing.ingredient IN ('malago', 'carrot', 'moogrop') GROUP BY ing.recipe_id ORDER BY count DESC) dt JOIN recipes r ON dt.recipe_id = r.id JOIN infos inf ON dt.recipe_id = inf.recipe_id JOIN ingredients ing ON dt.recipe_id = ing.recipe_id WHERE ing.ingredient IN ('malago', 'carrot', "moogrop")
