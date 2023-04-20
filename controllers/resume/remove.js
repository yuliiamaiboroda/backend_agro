const { ResumeModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const remove = async (req, res) => {
  const { resumeId } = req.params;
  const resume = ResumeModel.findByIdAndDelete(resumeId);

  if (!resume) {
    throw new NotFoundError();
  }

  res.status(204).send();
};

module.exports = { remove };
