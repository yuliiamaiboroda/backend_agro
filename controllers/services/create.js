const { ServicesModel } = require('../../models');
const { FileRequiredError } = require('../../helpers/utils');

// added
const create = async (req, res, next) => {
  const { title, description, price, contactMail, contactPhone } = req.body;

  if (!req.file) {
    throw new FileRequiredError();
  }
  const { path } = req.file;

  const result = await ServicesModel.create({
    title,
    description,
    imageURL: path,
    price,
    contactMail,
    contactPhone,
  });

  res.status(201).json(result);
};

module.exports = {
  create,
};
