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

exports.findRecipesByName = (name) =>
  prisma.recipe.findMany({
    where: { name: { contains: name } },
    include: { infos: { select: { image: true } } },
    orderBy: { createdAt: "desc" },
  });

// // exports.findRecipeIngredientByInclude = (include) => prisma.recipe.findMany({include: {ingredients: true}})

exports.findRecipesByInclude = (include) =>
  prisma.recipe.findMany({
    where: {
      ingredients: {
        some: {
          ingredient: {
            in: include,
          },
        },
      },
    },
    select: {
      ingredients: {
        where: { ingredient: { in: include } },
      },
      id: true,
      name: true,
      infos: { select: { image: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

exports.findRecipesByNameAndInclude = (name, include) =>
  prisma.recipe.findMany({
    where: {
      AND: [
        {
          ingredients: {
            some: {
              ingredient: {
                in: include,
              },
            },
          },
        },
        { name: { contains: name } },
      ],
    },
    select: {
      ingredients: {
        where: { ingredient: { in: include } },
      },
      id: true,
      name: true,
      infos: { select: { image: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

// return prisma.ingredient.groupBy({
//   by: ["recipeId"],
//   where: { ingredient: { in: ["carrot", "pla"] } },
//   _count: { ingredient: true },
//   orderBy: { _count: { ingredient: "desc" } },
// });
// const newInclude = include.substring(1, include.length - 1);
// console.log("newInclude", newInclude);
// console.log("(newInclude)", `(${newInclude})`);
//   return prisma.$queryRaw`SELECT
//   ing.recipe_id, COUNT(recipe_id) count
// FROM
//   recipes r
// JOIN ingredients ing ON r.id = ing.recipe_id
// GROUP BY ing.recipe_id, CAST(ing.recipe_id AS SIGNED)
// `;

// return prisma.recipe.findMany({
//   include: { ingredients: { select: { ingredient: true } } },
// });
// return prisma.recipe.findMany({
//   include: {
//     ingredients: true,
//     infos: true,
//     user: true,
//   },
//   where: {
//     ingredients: {
//       some: {
//         ingredient: {
//           in: ["malago", "carrot", "moogrop"],
//         },
//       },
//     },
//   },
//   orderBy: {
//     count: "desc",
//   },
// });

// return prisma.$queryRaw`SELECT * FROM (SELECT ing.recipe_id, COUNT(recipe_id) count FROM recipes r JOIN ingredients ing ON r.id = ing.recipe_id WHERE ing.ingredient IN ('malago', 'carrot', 'moogrop') GROUP BY ing.recipe_id ORDER BY count DESC) dt JOIN recipes r ON dt.recipe_id = r.id JOIN infos inf ON dt.recipe_id = inf.recipe_id JOIN ingredients ing ON dt.recipe_id = ing.recipe_id WHERE ing.ingredient IN ('malago', 'carrot', 'moogrop')`;
// return prisma.$queryRaw`SELECT * FROM (SELECT ing.recipe_id, COUNT(recipe_id) count FROM recipes r JOIN ingredients ing ON r.id = ing.recipe_id WHERE ing.ingredient IN (${newInclude}) GROUP BY ing.recipe_id ORDER BY count DESC) dt JOIN recipes r ON dt.recipe_id = r.id JOIN infos inf ON dt.recipe_id = inf.recipe_id JOIN ingredients ing ON dt.recipe_id = ing.recipe_id WHERE ing.ingredient IN (${newInclude})`;
// SELECT * FROM (SELECT ing.recipe_id, COUNT(recipe_id) count FROM recipes r JOIN ingredients ing ON r.id = ing.recipe_id WHERE ing.ingredient IN ('malago', 'carrot', 'moogrop') GROUP BY ing.recipe_id ORDER BY count DESC) dt JOIN recipes r ON dt.recipe_id = r.id JOIN infos inf ON dt.recipe_id = inf.recipe_id JOIN ingredients ing ON dt.recipe_id = ing.recipe_id WHERE ing.ingredient IN ('malago', 'carrot', "moogrop")
