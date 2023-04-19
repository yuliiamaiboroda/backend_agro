const { ProductsModel } = require("../../models");

const update = async (req, res) => {
  const { title, description } = req.body;
  const { productId } = req.params;
  const updatedProduct = await ProductsModel.findByIdAndUpdate(
    productId,
    {
      title,
      imageURL: req.file?.path,
      description,
    },
    { returnDocument: "after", runValidators: true }
  );
  res.status(200).json(updatedProduct);
};

module.exports = { update };
