const { ValidationError } = require('../helpers/utils');
const { removeCloudinaryFileByURL } = require('../helpers/utils');

const validateBody = schema => {
  const fn = (req, res, next) => {
    console.log('req.body: \n', JSON.stringify(req.body));
    const { error } = schema.validate(req.body);
    console.log('error: \n', error);
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
