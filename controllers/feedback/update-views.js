const { FeedbackModel } = require("../../models");
const { NotFoundError, IsAlreadyViewedError } = require("../../helpers/utils");

const updateViews = async (req, res, next) => {
  const { id: feedbackId } = req.params;
  const { _id: userId } = req.user;

  const feedback = await FeedbackModel.findById(feedbackId);

  if (!feedback) {
    throw new NotFoundError();
  }

  const isViewedFeedback = feedback.viewedBy.some(
    (el) => el.valueOf() === userId.valueOf()
  );

  if (isViewedFeedback) {
    throw new IsAlreadyViewedError();
  }

  await FeedbackModel.findByIdAndUpdate(
    feedbackId,
    {
      $push: { viewedBy: userId },
    },
    { runValidators: true }
  );

  res.status(204).send();
};

module.exports = { updateViews };
