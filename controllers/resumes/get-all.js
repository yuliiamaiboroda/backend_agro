const { ResumeModel, VacancyModel } = require("../../models");

const getAll = async (req, res) => {
  const { _id: userId } = req.user;
  const { position, sort = "desc", skip = 0, limit = 20 } = req.query;
  const matchQuery = {};

  const vacancies = await VacancyModel.find({}, { title: 1, _id: 0 });
  const vacancyTitleList = vacancies.reduce(
    (acc, { title }) => [...acc, title],
    []
  );

  if (position) {
    console.log("position", position);
    matchQuery.position = vacancyTitleList.includes(position)
      ? position
      : { $nin: vacancyTitleList };

    console.log("matchQuery", matchQuery);
  }

  const resumes = await ResumeModel.aggregate()
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
    .project({ name: 1, position: 1, comment: 1, isReviewed: 1 })
    .skip(Number(skip))
    .limit(Number(limit));

  const total = await ResumeModel.find(matchQuery)
    .sort({ createdAt: sort })
    .count("total");

  res
    .status(200)
    .json({ resumes, total, skip: Number(skip), limit: Number(limit) });
};

module.exports = { getAll };
