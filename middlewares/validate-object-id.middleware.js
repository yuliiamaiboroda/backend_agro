const mongoose = require("mongoose");
const { createHttpException } = require("../helpers/utils");
const { RESPONSE_ERRORS } = require("../helpers/constants");

const validateObjectId = (req, res, next) => {
  try {
    const [id] = Object.values(req.params);

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpException(RESPONSE_ERRORS.notFound);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateObjectId,
};
