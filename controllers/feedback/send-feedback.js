const { FeedbackModel } = require("../../models");

const sendFeedBack = async (req, res, next) => {
  const { name, contactPhone, contactMail, comment, agreement } = req.body;
  const result = await FeedbackModel.create({
    name,
    contactPhone,
    contactMail,
    comment,
    agreement,
  });
  res.status(201).json(result);
};

module.exports = {
  sendFeedBack,
};
