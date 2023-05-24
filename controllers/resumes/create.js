const { ResumeModel } = require("../../models");

const create = async (req, res) => {
  const { name, phone, email, position, comment, agreement } = req.body;

  const resume = await ResumeModel.create({
    name,
    phone,
    email,
    position,
    resumeFileURL: req.file?.path || null,
    comment,
    agreement,
  });

  res.status(201).json(resume);
};

module.exports = { create };
