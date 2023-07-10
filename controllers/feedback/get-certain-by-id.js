const { FeedbackModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const getCertainById = async (req, res, next) => {
  const { id } = req.params;

  const certainFeedback = await FeedbackModel.findById(id, { viewedBy: 0 });

  if (!certainFeedback) {
    throw new NotFoundError();
  }

  res.status(200).json(certainFeedback);
};

module.exports = { getCertainById };
