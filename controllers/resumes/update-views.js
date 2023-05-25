const { ResumeModel } = require("../../models");
const { NotFoundError, IsAlreadyViewedError } = require("../../helpers/utils");

const updateViews = async (req, res) => {
  const { resumeId } = req.params;
  const { _id: userId } = req.user;

  const resume = await ResumeModel.findById(resumeId);

  if (!resume) {
    throw new NotFoundError();
  }

  const isViewedResume = resume.viewedBy.some(
    (element) => element.valueOf() === userId.valueOf()
  );

  if (isViewedResume) {
    throw new IsAlreadyViewedError();
  }

  await ResumeModel.findByIdAndUpdate(
    resumeId,
    {
      $push: { viewedBy: userId },
    },
    { runValidators: true }
  );

  res.status(204).send();
};

module.exports = { updateViews };
