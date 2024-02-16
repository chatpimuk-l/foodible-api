const prisma = require("../models/prisma");

exports.createInfo = (data) => prisma.info.create({ data });
