const { ProductsModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const getCertain = async (req, res) => {
  const { productId } = req.params;
  const product = await ProductsModel.findById(productId);
  if (!product) {
    throw new NotFoundError();
  }

  res.status(200).json(product);
};

module.exports = { getCertain };
