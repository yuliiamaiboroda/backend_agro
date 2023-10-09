const productsService = require('../../services/products');

const getAllProducts = async (req, res) => {
  const products = await productsService.getAllProducts();

  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const product = await productsService.getProductById(req.params.id);

  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const product = await productsService.createProduct({
    ...req.body,
    file: req.file,
  });

  res.status(201).json(product);
};

const updateProductById = async (req, res) => {
  const product = await productsService.updateProductById(req.params.id, {
    ...req.body,
    file: req.file,
  });

  res.status(200).json(product);
};

const removeProductById = async (req, res) => {
  await productsService.removeProductById(req.params.id);

  res.status(204).send();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  removeProductById,
};
