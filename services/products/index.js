const { ProductsModel } = require('../../models');
const {
  renameIdField,
  NotFoundError,
  FileRequiredError,
  removeCloudinaryFileByURL,
} = require('../../helpers/utils');
const { UPDATE_DEFAULT_CONFIG } = require('../../helpers/constants');
const getProducts = async () => {
  const products = await ProductsModel.find();

  return products.map(product => renameIdField(product));
};

const getProductById = async productId => {
  const product = await ProductsModel.findById(productId);

  if (!product) throw new NotFoundError();

  return renameIdField(product);
};

const addProduct = async ({ title, description, imageURL }) => {
  if (!imageURL) throw new FileRequiredError();
  const product = await ProductsModel.create({ title, description, imageURL });

  return renameIdField(product);
};

const updateProductById = async (
  productId,
  { title, description, imageURL }
) => {
  if (imageURL) {
    const { imageURL: oldImageURL } = await ProductsModel.findById(productId);
    await removeCloudinaryFileByURL(oldImageURL);
  }

  const updatedProduct = await ProductsModel.findByIdAndUpdate(
    productId,
    {
      title,
      description,
      imageURL,
    },
    UPDATE_DEFAULT_CONFIG
  );

  return renameIdField(updatedProduct);
};

const removeProductById = async productId => {
  const product = await ProductsModel.findByIdAndDelete(productId);

  if (!product) throw new NotFoundError();

  await removeCloudinaryFileByURL(product.imageURL);

  return product;
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  removeProductById,
};
