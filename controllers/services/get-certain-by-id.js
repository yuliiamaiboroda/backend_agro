const { ServicesModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const getCertainById = async (req, res, next) => {
  const { serviceId } = req.params;

  const certainService = await ServicesModel.findById(serviceId);
  if (!certainService) {
    throw new NotFoundError();
  }

  res.status(200).json(certainService);
};

module.exports = {
  getCertainById,
};
