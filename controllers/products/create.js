const { ProductsModel } = require("../../models");
const { ImageRequiredError } = require("../../helpers/utils");

const create = async (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    throw new ImageRequiredError();
  }
  const { path } = req.file;
  const product = await ProductsModel.create({
    title,
    imageURL: path,
    description,
  });
  res.status(201).json(product);
};

module.exports = {
  create,
};
