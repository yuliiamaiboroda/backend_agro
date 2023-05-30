const { FeedbackModel } = require("../../models");

const create = async (req, res, next) => {
  const { name, contactPhone, contactMail, comment, agreement } = req.body;
  const newFeedback = await FeedbackModel.create({
    name,
    contactPhone,
    contactMail,
    comment,
    agreement,
  });

  const result = await FeedbackModel.findById(newFeedback._id, {
    agreement: 0,
    viewedBy: 0,
    createdAt: 0,
  });

  res.status(201).json(result);
};

module.exports = {
  create,
};
