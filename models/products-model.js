const mongoose = require('mongoose');

const productsSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: [true, 'title is required'] },
    description: {
      type: String,
      trim: true,
      required: [true, 'description is required'],
    },
    imageURL: {
      type: String,
      trim: true,
      required: [true, 'image of product card is required'],
    },
    price: {
      type: String,
      required: [true, 'price is required'],
      trim: true,
    },
    contactMail: {
      type: String,
      required: [true, 'contact email is required'],
      trim: true,
    },
    contactPhone: {
      type: String,
      required: [true, 'contact phone is required'],
      trim: true,
    },
  },

  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const ProductsModel = mongoose.model('products', productsSchema);

module.exports = {
  ProductsModel,
};
