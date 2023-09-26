const { ResumeModel } = require('../../models');
const vacanciesService = require('../vacancies');
// const { renameIdField } = require('../../helpers/utils');

const createResume = async resume => {
  const {
    _id: id,
    name,
    phone,
    email,
    position,
    comment,
    isFavorite,
    createdAt,
  } = await ResumeModel.create(resume);

  return {
    id,
    name,
    phone,
    email,
    position,
    comment,
    isFavorite,
    createdAt,
  };
};

const getAllResumes = async ({
  userId,
  isFavorite,
  position,
  sort,
  skip,
  limit,
}) => {
  const matchQuery = {};

  if (isFavorite) {
    matchQuery.isFavorite = true;
  }

  if (position) {
    const vacancies = await vacanciesService.getVacanciesTitles();
    const vacancyTitleList = vacancies
      .reduce((acc, { title }) => [...acc, title``], [])
      .filter((title, index, list) => list.indexOf(title) === index);
    matchQuery.position = vacancyTitleList.includes(position)
      ? position
      : { $nin: vacancyTitleList };
  }

  const resumes = await ResumeModel.aggregate()
    .match(matchQuery)
    .addFields({
      isReviewed: {
        $cond: {
          if: {
            $first: {
              $filter: {
                input: '$viewedBy',
                as: 'viewedUserId',
                cond: { $eq: ['$$viewedUserId', userId] },
              },
            },
          },
          then: true,
          else: false,
        },
      },
    })
    .sort({ createdAt: sort })
    .project({ name: 1, position: 1, comment: 1, isFavorite: 1, isReviewed: 1 })
    .skip(Number(skip))
    .limit(Number(limit));

  const total = await ResumeModel.find(matchQuery)
    .sort({ createdAt: sort })
    .count('total');

  return { resumes, total, skip: Number(skip), limit: Number(limit) };
};

module.exports = {
  createResume,
  getAllResumes,
};
