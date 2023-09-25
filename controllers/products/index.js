const productsService = require('../../services/products');

const getAllProducts = async (req, res) => {
  const products = await productsService.getProducts();

  res.status(200).json(products);
};

const getCertainProductById = async (req, res) => {
  const product = await productsService.getProductById(req.params.productId);

  res.status(200).json(product);
};

const addNewProduct = async (req, res) => {
  const { title, description } = req.body;
  const imageURL = req.file ? req.file.path : undefined;
  const product = await productsService.addProduct({
    title,
    description,
    imageURL,
  });

  res.status(201).json(product);
};

const updateCertainProductById = async (req, res) => {
  const { title, description } = req.body;
  const imageURL = req.file ? req.file.path : undefined;

  const product = await productsService.updateProductById(
    req.params.productId,
    { title, description, imageURL }
  );

  res.status(200).json(product);
};

const removeCertainProductById = async (req, res) => {
  await productsService.removeProductById(req.params.productId);

  res.status(204).send();
};

module.exports = {
  getAllProducts,
  getCertainProductById,
  addNewProduct,
  updateCertainProductById,
  removeCertainProductById,
};
