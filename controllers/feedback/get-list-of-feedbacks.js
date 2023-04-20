const { FeedbackModel } = require("../../models");

const getListOfFeedBack = async (req, res, next) => {
  const listAllFeddBack = await FeedbackModel.find();

  res.status(200).json(listAllFeddBack);
};
module.exports = {
  getListOfFeedBack,
};
