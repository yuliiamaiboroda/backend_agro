const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  location: {
    type: String,
    required: [true, "location is required"],
    trim: true,
  },
  contactMail: {
    type: String,
    required: [true, "contact email is required"],
    trim: true,
  },
  contactPhone: {
    type: String,
    required: [true, "contact phone is required"],
    trim: true,
  },
});

const ProductsModel = mongoose.model("products", productsSchema);

module.exports = {
  ProductsModel,
};
