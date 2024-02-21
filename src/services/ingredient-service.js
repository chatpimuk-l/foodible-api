const prisma = require("../models/prisma");

exports.createIngredient = (data) => prisma.ingredient.create({ data });

exports.deleteIngredient = (recipeId) =>
  prisma.ingredient.deleteMany({ where: { recipeId: +recipeId } });
