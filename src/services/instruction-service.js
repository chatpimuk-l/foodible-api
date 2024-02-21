const prisma = require("../models/prisma");

exports.createInstruction = (data) => prisma.instruction.create({ data });

exports.deleteInstruction = (recipeId) =>
  prisma.instruction.deleteMany({ where: { recipeId: +recipeId } });
