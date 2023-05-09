const { ServicesModel } = require("../../models");
const { ImageRequiredError } = require("../../helpers/utils");

const create = async (req, res, next) => {
  const { title, description, price, contactMail, contactPhone } =
    req.body;

  if (!req.file) {
    throw new ImageRequiredError();
  }
  const { path } = req.file;

  console.log('test line')

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
