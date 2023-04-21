const { ServicesModel } = require("../../models");
const {
  NotFoundError,
  removeCloudinaryFileByURL,
} = require("../../helpers/utils");

const removeById = async (req, res, next) => {
  const { serviceId } = req.params;

  const service = await ServicesModel.findByIdAndDelete(serviceId);

  if (!service) {
    throw new NotFoundError();
  }

  await removeCloudinaryFileByURL(service.imageURL);

  res.status(204).send();
};

module.exports = {
  removeById,
};
