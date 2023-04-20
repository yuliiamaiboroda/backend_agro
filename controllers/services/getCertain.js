const { ServicesModel } = require("../../models");
const { AccessDeniedError, NotFoundError } = require("../../helpers/utils");

const getCertain = async (req, res, next) => {
  const { role } = req.user;
  const { serviceId } = req.params;

  if (role !== "admin") {
    throw new AccessDeniedError();
  }

  const certainService = await ServicesModel.findById(serviceId);
  console.log("certainService: ", certainService);
  if (!certainService) {
    throw new NotFoundError();
  }

  res.status(200).json(certainService);
};

module.exports = {
  getCertain,
};
