const { ServicesModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const getCertain = async (req, res, next) => {
  const { role } = req.user;
  const { _id } = req.params;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  const certainService = await ServicesModel.findById(_id);
  if (!certainService) {
    throw createHttpException(RESPONSE_ERRORS.notFound);
  }

  res.status(201).json({ message: "Get certain service was success" });
};

module.exports = {
  getCertain,
};
