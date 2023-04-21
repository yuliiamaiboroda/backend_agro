const { ResumeModel } = require("../../models");
const {
  NotFoundError,
  removeCloudinaryFileByURL,
} = require("../../helpers/utils");

const remove = async (req, res) => {
  const { resumeId } = req.params;
  const resume = await ResumeModel.findByIdAndDelete(resumeId);

  if (!resume) {
    throw new NotFoundError();
  }

  await removeCloudinaryFileByURL(resume.resumeFileURL);

  res.status(204).send();
};

module.exports = { remove };
