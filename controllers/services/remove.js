const { ServicesModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const remove = async (req, res, next) => {
  const { role } = req.user;
  const { serviceId } = req.params;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  await ServicesModel.findByIdAndDelete(serviceId);
  res.status(204).send();
};

module.exports = {
  remove,
};
