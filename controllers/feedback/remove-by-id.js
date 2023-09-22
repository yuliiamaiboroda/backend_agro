const { FeedbackModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

// added
const removeById = async (req, res, next) => {
  const { id } = req.params;
  const feedback = await FeedbackModel.findById(id);

  if (!feedback) {
    throw new NotFoundError();
  }

  await FeedbackModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  removeById,
};
