const prisma = require("../models/prisma");

exports.createIngredient = (data) => prisma.ingredient.create({ data });
