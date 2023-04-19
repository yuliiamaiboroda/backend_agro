const { ProductsModel } = require("../../models");

const create = async (req, res) => {
  const { title, imageURL, description } = req.body;
  const product = await ProductsModel.create({ title, imageURL, description });
  res.status(201).json(product);
};

module.exports = {
  create,
};
