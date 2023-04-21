const { ProductsModel } = require("../../models");
const {
  NotFoundError,
  CloudinaryFailedError,
  removeCloudinaryFileByURL,
} = require("../../helpers/utils");

const remove = async (req, res) => {
  const { productId } = req.params;
  const product = await ProductsModel.findByIdAndDelete(productId);

  if (!product) {
    throw new NotFoundError();
  }

  const { result } = removeCloudinaryFileByURL(product.imageURL);

  if (result !== "ok") {
    throw new CloudinaryFailedError();
  }

  res.status(204).send();
};

module.exports = { remove };
