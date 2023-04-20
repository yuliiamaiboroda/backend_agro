const mongoose = require("mongoose");
const { NOTICE_CATEGORIES } = require("../helpers/constants");

const vacanciesSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Set category for vacancy"],
      enum: Object.values(NOTICE_CATEGORIES),
    },
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    sallary: {
      type: String,
      required: [true, "sallary is required"],
      trim: true,
    },
    education: {
      type: String,
      required: [true, "education is required"],
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
    workExperienceRequired: {
      type: String,
      required: [true, "work experience required is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
  },
  { versionKey: false }
);

const VacancyModel = mongoose.model("vacancies", vacanciesSchema);
module.exports = {
  VacancyModel,
};
