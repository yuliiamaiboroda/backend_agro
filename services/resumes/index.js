const { ResumeModel } = require('../../models');
const vacanciesService = require('../vacancies');
const {
  renameIdField,
  NotFoundError,
  IsAlreadyViewedError,
  removeCloudinaryFileByURL,
} = require('../../helpers/utils');
const { UPDATE_DEFAULT_CONFIG } = require('../../helpers/constants');

const createResume = async ({
  name,
  phone,
  email,
  position,
  comment,
  agreement,
  file,
}) => {
  const resumeFileURL = file ? file.path : null;
  const resume = await ResumeModel.create({
    name,
    phone,
    email,
    position,
    comment,
    agreement,
    resumeFileURL,
  });

  return renameIdField(resume);
};

const getAllResumes = async ({
  userId,
  isFavorite,
  position,
  sort = 'desc',
  skip = 0,
  limit = 20,
}) => {
  const matchQuery = {};

  if (isFavorite) {
    matchQuery.isFavorite = true;
  }

  if (position) {
    const vacancies = await vacanciesService.getVacanciesTitles();
    const vacancyTitleList = vacancies
      .reduce((acc, { title }) => [...acc, title], [])
      .filter((title, index, list) => list.indexOf(title) === index);
    matchQuery.position = vacancyTitleList.includes(position)
      ? position
      : { $nin: vacancyTitleList };
  }

  const resumes = await ResumeModel.aggregate()
    .match(matchQuery)
    .addFields({
      id: '$_id',
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
    .project({
      _id: 0,
      viewedBy: 0,
      agreement: 0,
    })
    .skip(Number(skip))
    .limit(Number(limit));

  const total = await ResumeModel.find(matchQuery)
    .sort({ createdAt: sort })
    .count('total');

  return { resumes, total, skip: Number(skip), limit: Number(limit) };
};

const getResumeById = async id => {
  const resume = await ResumeModel.findById(id, {
    agreement: 0,
    viewedBy: 0,
  });

  return renameIdField(resume);
};

const removeResumeById = async id => {
  const resume = await ResumeModel.findByIdAndDelete(id);

  if (!resume) throw new NotFoundError();

  await removeCloudinaryFileByURL(resume.resumeFileURL);

  return renameIdField(resume);
};

const updateResumeIsViewed = async (resumeId, userId) => {
  const resume = await ResumeModel.findById(resumeId);

  if (!resume) throw new NotFoundError();

  const isViewedResume = resume.viewedBy.some(
    userIdItem => userIdItem.valueOf() === userId.valueOf()
  );

  if (isViewedResume) throw new IsAlreadyViewedError();

  const updatedResume = await ResumeModel.findByIdAndUpdate(
    resumeId,
    {
      $push: { viewedBy: userId },
    },
    { ...UPDATE_DEFAULT_CONFIG, select: '-viewedBy -agreement' }
  );

  return renameIdField(updatedResume);
};

const updateResumeIsFavorite = async id => {
  const resume = await ResumeModel.findById(id);

  if (!resume) throw new NotFoundError();

  const updatedResume = await ResumeModel.findByIdAndUpdate(
    id,
    { isFavorite: !resume.isFavorite },
    { runValidators: true }
  );

  return updatedResume;
};

module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  removeResumeById,
  updateResumeIsViewed,
  updateResumeIsFavorite,
};
