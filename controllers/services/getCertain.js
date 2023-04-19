const { ServicesModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const getCertain = async (req, res, next) => {
  const { role } = req.user;
  const { serviceId } = req.params;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  const certainService = await ServicesModel.findById(serviceId);
  console.log("certainService: ", certainService);
  if (!certainService) {
    throw createHttpException(RESPONSE_ERRORS.notFound);
  }

  res.status(200).json(certainService);
};

module.exports = {
  getCertain,
};
