const { FeedbackModel } = require("../../models");

// added
const getAll = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { isFavorite, sort = "desc", skip = 0, limit = 20 } = req.query;
  const matchQuery = {};

  if (isFavorite) {
    matchQuery.isFavorite = true;
  }

  const feedbacks = await FeedbackModel.aggregate()
    .match(matchQuery)
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
      comment: 1,
      isReviewed: 1,
      isFavorite: 1,
    })
    .skip(Number(skip))
    .limit(Number(limit));

  const total = await FeedbackModel.find(matchQuery)
    .sort({ createdAt: sort })
    .count("total");

  res
    .status(200)
    .json({ feedbacks, total, skip: Number(skip), limit: Number(limit) });
};

module.exports = {
  getAll,
};
