const { FeedbackModel } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { sort = "desc", skip = 0, limit = 20 } = req.query;

  const feedbacks = await FeedbackModel.aggregate()
    .addFields({
      isReviewed: {
        $cond: {
          if: {
            $first: {
              $filter: {
                input: "$viewedBy",
                as: "viewedUserId",
                cond: { $eq: ["$$viewedUserId", userId] },
              },
            },
          },
          then: true,
          else: false,
        },
      },
    })
    .sort({ createdAt: sort })
    .project({
      name: 1,
      position: 1,
      comment: 1,
      isReviewed: 1,
      createdAt: 1,
    });

  res.status(200).json(feedbacks);
};

module.exports = {
  getAll,
};
