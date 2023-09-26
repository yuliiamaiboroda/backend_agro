const { updateViews } = require('./update-views');
const { getCertainById } = require('./get-certain-by-id');
const { removeById } = require('./remove-by-id');
const { updateIsFavorite } = require('./update-is-favorite');
const resumesService = require('../../services/resumes');

const createResume = async (req, res) => {
  const { name, phone, email, position, comment, agreement } = req.body;
  const resumeFileURL = req.file ? req.file.path : null;
  const resume = await resumesService.createResume({
    name,
    phone,
    email,
    position,
    comment,
    agreement,
    resumeFileURL,
  });
  res.status(201).json(resume);
};

const getAllResumes = async (req, res) => {
  const { _id: userId } = req.user;
  const {
    isFavorite,
    position,
    sort = 'desc',
    skip = 0,
    limit = 20,
  } = req.query;

  const resumes = await resumesService.getAllResumes({
    userId,
    isFavorite,
    position,
    sort,
    skip,
    limit,
  });
  res.status(200).json(resumes);
};

module.exports = {
  createResume,
  updateViews,
  getAllResumes,
  getCertainById,
  removeById,
  updateIsFavorite,
};
