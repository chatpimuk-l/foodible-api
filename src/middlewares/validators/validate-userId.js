const Joi = require("joi");

const userIdSchema = Joi.object({
  targetUserId: Joi.number().required().positive(),
});

exports.validateTargetUserId = (req, res, next) => {
  const { value, error } = userIdSchema.validate({
    targetUserId: req.params.targetUserId,
  });
  if (error) {
    throw error;
  }
  req.targetUserId = value.targetUserId;
  next();
};
