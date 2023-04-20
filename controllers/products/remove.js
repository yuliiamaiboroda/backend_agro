const { ProductsModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const remove = async (req, res) => {
  const { productId } = req.params;
  const product = await ProductsModel.findByIdAndDelete(productId);

  if (!product) {
    throw new NotFoundError();
  }
  res.status(204).send();
};

module.exports = { remove };
