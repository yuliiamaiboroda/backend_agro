const { ProductsModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const getCertain = async (req, res) => {
  const { productId } = req.params;
  console.log("productId: ", productId);
  const product = await ProductsModel.findById(productId);
  console.log("product: ", product);
  if (!product) {
    throw createHttpException(RESPONSE_ERRORS.notFound);
  }

  res.status(200).json(product);
};

module.exports = { getCertain };
