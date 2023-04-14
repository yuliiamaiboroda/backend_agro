const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  title: { type: String },
  imageURL: { type: String },
  description: { type: String },
});

const ProductsModel = mongoose.model("products", productsSchema);

module.exports = {
  ProductsModel,
};
