const { ResumeModel } = require("../../models");
const {
  NotFoundError,
  CloudinaryFailedError,
  removeCloudinaryFileByURL,
} = require("../../helpers/utils");

const remove = async (req, res) => {
  const { resumeId } = req.params;
  const resume = await ResumeModel.findByIdAndDelete(resumeId);

  if (!resume) {
    throw new NotFoundError();
  }

  const { result } = await removeCloudinaryFileByURL(resume.resumeFileURL);

  if (result !== "ok") {
    throw new CloudinaryFailedError();
  }

  res.status(204).send();
};

module.exports = { remove };
