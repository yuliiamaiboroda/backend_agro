const { ProductsModel } = require("../../models");
const {
  NotFoundError,
  removeCloudinaryFileByURL,
} = require("../../helpers/utils");

const remove = async (req, res) => {
  const { productId } = req.params;
  const product = await ProductsModel.findByIdAndDelete(productId);

  if (!product) {
    throw new NotFoundError();
  }

  await removeCloudinaryFileByURL(product.imageURL);

  res.status(204).send();
};

module.exports = { remove };
