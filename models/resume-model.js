const mongoose = require("mongoose");

const resumeShema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    position: { type: String, trim: true },
    resumeFileURL: { type: String, trim: true },
    comment: { type: String, trim: true },
    agreement: { type: Boolean },
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
