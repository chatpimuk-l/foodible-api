const prisma = require("../models/prisma");

exports.createInstruction = (data) => prisma.instruction.create({ data });
