const { ResumeModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const getCertain = async (req, res) => {
  const { resumeId } = req.params;
  const resume = await ResumeModel.findById(resumeId);

  if (!resume) {
    throw new NotFoundError();
  }

  res.status(200).json(resume);
};

module.exports = { getCertain };
