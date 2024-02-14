const prisma = require("../models/prisma");

exports.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: { email },
  });

exports.findUserById = (id) =>
  prisma.user.findFirst({
    where: { id },
  });

exports.createUser = (data) => prisma.user.create({ data });

exports.findUserProfileByTargetUserId = (targetUserId) =>
  prisma.user.findFirst({
    where: { id: targetUserId },
    include: { recipes: true, favs: true },
  });
