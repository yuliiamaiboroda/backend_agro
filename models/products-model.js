const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    title: { type: String },
    imageURL: { type: String },
    description: { type: String },
  },

  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const ProductsModel = mongoose.model("products", productsSchema);

module.exports = {
  ProductsModel,
};
