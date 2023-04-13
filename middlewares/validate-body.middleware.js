const { createHttpException } = require("../helpers/utils");

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createHttpException({ status: 400, message: error.message }));
    }

    next();
  };

  return fn;
};

module.exports = {
  validateBody,
};
