const { ProductsModel } = require('../../models');
const {
  renameIdField,
  NotFoundError,
  FileRequiredError,
  removeCloudinaryFileByURL,
} = require('../../helpers/utils');
const { UPDATE_DEFAULT_CONFIG } = require('../../helpers/constants');

const getAllProducts = async () => {
  const products = await ProductsModel.find();

  return products.map(product => renameIdField(product));
};

const getProductById = async id => {
  const product = await ProductsModel.findById(id);

  if (!product) throw new NotFoundError();

  return renameIdField(product);
};

const createProduct = async ({ title, description, imageURL }) => {
  if (!imageURL) throw new FileRequiredError();

  const product = await ProductsModel.create({ title, description, imageURL });

  return renameIdField(product);
};

const updateProductById = async (id, { title, description, imageURL }) => {
  if (imageURL) {
    const { imageURL: oldImageURL } = await ProductsModel.findById(id);
    await removeCloudinaryFileByURL(oldImageURL);
  }

  const updatedProduct = await ProductsModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
      imageURL,
    },
    UPDATE_DEFAULT_CONFIG
  );

  return renameIdField(updatedProduct);
};

const removeProductById = async id => {
  const product = await ProductsModel.findByIdAndDelete(id);

  if (!product) throw new NotFoundError();

  await removeCloudinaryFileByURL(product.imageURL);

  return { message: 'Product deleted' };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  removeProductById,
};
