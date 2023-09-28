const { ServicesModel } = require('../../models');
const { removeCloudinaryFileByURL } = require('../../helpers/utils');
// added
const updateById = async (req, res, next) => {
  const { serviceId } = req.params;
  const { title, description, price, contactMail, contactPhone } = req.body;

  if (req.file) {
    const { imageURL } = await ServicesModel.findById(serviceId);
    await removeCloudinaryFileByURL(imageURL);
  }

  const updatedService = await ServicesModel.findByIdAndUpdate(
    serviceId,
    {
      title,
      description,
      imageURL: req.file?.path,
      price,
      contactMail,
      contactPhone,
    },
    { returnDocument: 'after', runValidators: true }
  );
  res.status(200).json(updatedService);
};

module.exports = {
  updateById,
};
