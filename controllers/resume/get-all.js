const { ResumeModel } = require("../../models");

const getAll = async (req, res) => {
  const resumes = await ResumeModel.find();
  res.status(200).json(resumes);
};

module.exports = { getAll };
