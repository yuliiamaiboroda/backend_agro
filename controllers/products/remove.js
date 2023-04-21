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

  const { result } = await removeCloudinaryFileByURL(product.imageURL);

  console.log("result\n", result);

  if (result !== "ok") {
    throw new CloudinaryFailedError();
  }

  res.status(204).send();
};

module.exports = { remove };
