const { ResumeModel } = require("../../models");

const create = async (req, res) => {
  const { name, phone, email, position, comment, agreement } = req.body;

  const newResume = await ResumeModel.create({
    name,
    phone,
    email,
    position,
    resumeFileURL: req.file?.path || null,
    comment,
    agreement,
  });

  const resume = await ResumeModel.findById(newResume._id, {
    agreement: 0,
    viewedBy: 0,
    createdAt: 0,
  });

  res.status(201).json(resume);
};

module.exports = { create };
