const { ServicesModel } = require('../../models');
// added
const getAll = async (_, res) => {
  const services = await ServicesModel.find();
  res.status(200).json(services);
};

module.exports = { getAll };
