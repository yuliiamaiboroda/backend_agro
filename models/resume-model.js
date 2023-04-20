const mongoose = require("mongoose");

const resumeShema = mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  position: { type: String },
  resumeFileURL: { type: String },
  comment: { type: String },
  agreement: { type: Boolean },
});

const ResumeModel = mongoose.model("resumes", resumeShema);

module.exports = { ResumeModel };
