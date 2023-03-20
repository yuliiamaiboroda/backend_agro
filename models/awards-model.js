const mongoose = require("mongoose");

const awardsSchema = mongoose.Schema({
  image: {
    type: String,
    required: [true, "image award is required"],
  },
});

const AwardsModel = mongoose.model("awards", awardsSchema);

module.exports = {
  AwardsModel,
};
