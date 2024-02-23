const prisma = require("../models/prisma");

exports.createResponse = (data) => prisma.response.create({ data });

exports.getResponsesByRecipeId = (recipeId) =>
  prisma.response.findMany({
    where: { AND: [{ recipeId: recipeId }, { comment: { not: null } }] },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

exports.getRatingsByRecipeId = (recipeId) =>
  prisma.response.aggregate({
    _avg: { rating: true },
    _count: { rating: true },
    where: { recipeId: +recipeId },
  });
