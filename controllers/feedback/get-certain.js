const { FeedbackModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const getCertain = async (req, res, next) => {
  const { id } = req.params;

  const certainFeedback = await FeedbackModel.findById(id);

  if (!certainFeedback) {
    throw new NotFoundError();
  }

  res.status(200).json(certainFeedback);
};

module.exports = { getCertain };
