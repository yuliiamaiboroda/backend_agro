const { FeedbackModel } = require("../../models");
const { AccessDeniedError, NotFoundError } = require("../../helpers/utils");

const getCertainFeedback = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin") {
    throw new AccessDeniedError();
  }

  const certainFeedback = await FeedbackModel.findById(id);

  if (!id || !certainFeedback) {
    throw new NotFoundError();
  }

  res.status(200).json(certainFeedback);
};

module.exports = { getCertainFeedback };
