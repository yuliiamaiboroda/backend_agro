const mongoose = require("mongoose");

const feedbacksSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], trim: true },
    contactPhone: {
      type: String,
      required: [true, "contact phone is required"],
      trim: true,
    },
    contactMail: {
      type: String,
      required: [true, "contact email is required"],
      trim: true,
    },
    comment: {
      type: String,
      required: [true, "comment is required"],
      trim: true,
    },
    agreement: {
      type: Boolean,
      required: [true, "agreement is required"],
    },
  },
  { versionKey: false }
);

const FeedbackModel = mongoose.model("feedbacks", feedbacksSchema);

module.exports = {
  FeedbackModel,
};
