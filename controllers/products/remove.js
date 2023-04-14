const { ProductsModel } = require("../../models");

const remove = async (req, res) => {
  const { productId } = req.params;
  await ProductsModel.findByIdAndDelete(productId);
  res.status(204).send();
};

module.exports = { remove };
