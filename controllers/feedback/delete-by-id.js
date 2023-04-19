const { FeedbackModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const deleteById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  const feedback = await FeedbackModel.findById(id);

  if (!feedback || !id) {
    throw createHttpException(RESPONSE_ERRORS.notFound);
  }

  await FeedbackModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  deleteById,
};
