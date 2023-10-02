const servicesService = require('../../services/services');

const getAllServices = async (req, res) => {
  const services = await servicesService.getAllServices();

  res.status(200).json(services);
};

const getServiceById = async (req, res) => {
  const service = await servicesService.getServiceById(req.params.id);

  res.status(200).json(service);
};

const removeServiceById = async (req, res) => {
  await servicesService.removeServiceById(req.params.id);

  res.status(204).send();
};

const createService = async (req, res) => {
  const service = await servicesService.createService(req.body, req.file);

  res.status(201).json(service);
};

const updateServiceById = async (req, res) => {
  const service = await servicesService.updateServiceById(
    req.params.id,
    req.body,
    req.file
  );

  res.status(200).json(service);
};

module.exports = {
  getAllServices,
  getServiceById,
  removeServiceById,
  createService,
  updateServiceById,
};
