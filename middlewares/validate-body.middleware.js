const { ValidationError } = require("../helpers/utils");

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError(error.message));
    }

    next();
  };

  return fn;
};

module.exports = {
  validateBody,
};
