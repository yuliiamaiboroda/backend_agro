const { FeedbackModel } = require("../../models");
const { AccessDeniedError, NotFoundError } = require("../../helpers/utils");

const deleteById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin") {
    throw new AccessDeniedError();
  }

  const feedback = await FeedbackModel.findById(id);

  if (!feedback || !id) {
    throw new NotFoundError();
  }

  await FeedbackModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  deleteById,
};
