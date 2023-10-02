const { ServicesModel } = require('../../models');
const {
  FileRequiredError,
  renameIdField,
  NotFoundError,
  removeCloudinaryFileByURL,
} = require('../../helpers/utils');
const { UPDATE_DEFAULT_CONFIG } = require('../../helpers/constants');

const getAllServices = async () => {
  const services = await ServicesModel.find();

  return services.map(service => renameIdField(service));
};

const createService = async (body, file) => {
  const { title, description, price, contactMail, contactPhone } = body;

  if (!file) throw new FileRequiredError();

  const { path } = file;

  const service = await ServicesModel.create({
    title,
    description,
    imageURL: path,
    price,
    contactMail,
    contactPhone,
  });

  return renameIdField(service);
};

const getServiceById = async id => {
  const service = await ServicesModel.findById(id);

  if (!service) throw new NotFoundError();

  return renameIdField(service);
};

const removeServiceById = async id => {
  const service = await ServicesModel.findByIdAndDelete(id);

  if (!service) throw new NotFoundError();

  await removeCloudinaryFileByURL(service.imageURL);

  return { message: 'Service deleted' };
};

const updateServiceById = async (id, body, file = null) => {
  const { title, description, price, contactMail, contactPhone } = body;

  if (file) {
    const { imageURL: oldImageURL } = await ServicesModel.findById(id);
    await removeCloudinaryFileByURL(oldImageURL);
  }

  const updatedService = await ServicesModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
      imageURL: file?.path,
      price,
      contactMail,
      contactPhone,
    },
    UPDATE_DEFAULT_CONFIG
  );

  return renameIdField(updatedService);
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  removeServiceById,
  updateServiceById,
};
