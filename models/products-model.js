const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, require: true },
    imageURL: { type: String, trim: true, require: true },
    description: { type: String, trim: true, require: true },
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
