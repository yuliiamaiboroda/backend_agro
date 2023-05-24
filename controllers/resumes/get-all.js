const { ResumeModel } = require("../../models");

const getAll = async (req, res) => {
  const { _id: userId } = req.user;

  const resumes = await ResumeModel.aggregate()
    .match({})
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
    .sort({ createdAt: -1 })
    .project({ viewedBy: 0, createdAt: 0 });

  res.status(200).json(resumes);
};

module.exports = { getAll };
