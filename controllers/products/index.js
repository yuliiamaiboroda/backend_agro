// const { getAll } = require("./get-all");
const { getCertainById } = require('./get-certain-by-id');
const { create } = require('./create');
const { updateById } = require('./update-by-id');
const { removeById } = require('./remove-by-id');
const productsService = require('../../services/products');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

module.exports = {
  getAll,
  getCertainById,
  create,
  updateById,
  removeById,
};
