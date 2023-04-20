const { FeedbackModel } = require("../../models");
const { AccessDeniedError } = require("../../helpers/utils");

const getListOfFeedBack = async (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw new AccessDeniedError();
  }
  const listAllFeddBack = await FeedbackModel.find();

  res.status(200).json(listAllFeddBack);
};
module.exports = {
  getListOfFeedBack,
};
