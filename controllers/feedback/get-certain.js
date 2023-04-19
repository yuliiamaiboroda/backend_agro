const { FeedbackModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const getCertainFeedback = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  const certainFeedback = await FeedbackModel.findById(id);

  if (!id || !certainFeedback) {
    throw createHttpException(RESPONSE_ERRORS.notFound);
  }

  res.status(200).json(certainFeedback);
};

module.exports = { getCertainFeedback };
