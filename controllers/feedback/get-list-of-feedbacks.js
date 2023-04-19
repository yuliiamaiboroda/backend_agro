const { FeedbackModel } = require("../../models");
const { RESPONSE_ERRORS } = require("../../helpers/constants");
const { createHttpException } = require("../../helpers/utils");

const getListOfFeedBack = async (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }
  const listAllFeddBack = await FeedbackModel.find();

  res.status(200).json(listAllFeddBack);
};
module.exports = {
  getListOfFeedBack,
};
