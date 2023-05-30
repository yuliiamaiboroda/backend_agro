const mongoose = require("mongoose");

const resumeShema = mongoose.Schema(
  {
    name: { type: String, trim: true, require: true },
    phone: { type: String, trim: true, require: true },
    email: { type: String, trim: true, require: true },
    position: { type: String, trim: true, require: true },
    resumeFileURL: { type: String, trim: true },
    comment: { type: String, trim: true, require: true },
    agreement: { type: Boolean, require: true },
    viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },

  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const ResumeModel = mongoose.model("resumes", resumeShema);

module.exports = { ResumeModel };
