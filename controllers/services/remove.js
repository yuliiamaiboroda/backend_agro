const { ServicesModel } = require("../../models");

const remove = async (req, res, next) => {
  const { serviceId } = req.params;

  await ServicesModel.findByIdAndDelete(serviceId);
  res.status(204).send();
};

module.exports = {
  remove,
};
