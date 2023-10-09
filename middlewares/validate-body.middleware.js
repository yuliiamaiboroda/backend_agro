const { ValidationError } = require('../helpers/utils');
const { removeCloudinaryFileByURL } = require('../helpers/utils');

const validateBody = schema => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      removeCloudinaryFileByURL(req.file?.path);
      next(new ValidationError(error.message));
    }

    next();
  };

  return fn;
};

module.exports = {
  validateBody,
};
