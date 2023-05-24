const { ResumeModel, VacancyModel } = require("../../models");

const getAll = async (req, res) => {
  const { _id: userId } = req.user;

  const { position, sort = "desc" } = req.query;

  const matchQuery = {};

  if (position && position !== "other") {
    matchQuery.position = position;
  }

  if (position === "other") {
    const vacancies = await VacancyModel.find({}, { title: 1, _id: 0 });
    const vacancyList = vacancies.reduce(
      (acc, { title }) => [...acc, title],
      []
    );
    matchQuery.position = { $nin: vacancyList };
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
    .project({ viewedBy: 0, createdAt: 0 });

  res.status(200).json(resumes);
};

module.exports = { getAll };
