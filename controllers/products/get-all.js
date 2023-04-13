const { ProductsModel } = require("../../models");

const getAll = async (req, res) => {
  const products = await ProductsModel.find();
  res.status(200).json(products);
};

module.exports = { getAll };
