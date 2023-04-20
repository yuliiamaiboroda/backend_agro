const mongoose = require("mongoose");
const { NotFoundError } = require("../helpers/utils");

const validateObjectId = (req, res, next) => {
  try {
    const [id] = Object.values(req.params);

    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundError();
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateObjectId,
};
