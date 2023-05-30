const { ResumeModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const updateIsFavorite = async (req, res) => {
  const { resumeId } = req.params;

  const resume = await ResumeModel.findById(resumeId);

  if (!resume) {
    throw new NotFoundError();
  }

  await ResumeModel.findByIdAndUpdate(
    resumeId,
    { isFavorite: !resume.isFavorite },
    { runValidators: true }
  );

  res.status(204).send();
};

module.exports = { updateIsFavorite };
