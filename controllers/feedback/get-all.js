const { FeedbackModel } = require("../../models");

const getAll = async (req, res, next) => {
  const listAllFeddBack = await FeedbackModel.find();

  res.status(200).json(listAllFeddBack);
};

module.exports = {
  getAll,
};
