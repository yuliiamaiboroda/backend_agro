const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  imageURL: {
    type: String,
    required: [true, "image of service card is required"],
  },
  price: {
    type: String,
    required: [true, "price is required"],
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
},
{
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
}
);

const ServicesModel = mongoose.model("services", servicesSchema);

module.exports = {
  ServicesModel,
};
