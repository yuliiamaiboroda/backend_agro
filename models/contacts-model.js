const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema({
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
  adress: {
    type: String,
    required: [true, "contact phone is required"],
    trim: true,
  },
});

const ContactsModel = mongoose.model("contacts", contactsSchema);

module.exports = {
  ContactsModel,
};
