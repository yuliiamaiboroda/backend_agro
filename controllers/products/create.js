const { ProductsModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const create = async (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    throw createHttpException(RESPONSE_ERRORS.imageRequired);
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
