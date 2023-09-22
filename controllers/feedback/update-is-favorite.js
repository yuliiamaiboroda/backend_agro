const { NotFoundError } = require("../../helpers/utils");
const { FeedbackModel } = require("../../models");

// added

const updateIsFavorite = async (req, res, next) => {
  const { id } = req.params;

  const feedback = await FeedbackModel.findById(id);

  if (!feedback) {
    throw new NotFoundError();
  }

  await FeedbackModel.findByIdAndUpdate(
    id,
    {
      isFavorite: !feedback.isFavorite,
    },
    { runValidators: true }
  );

  res.status(204).send();
};

module.exports = {
  updateIsFavorite,
};
