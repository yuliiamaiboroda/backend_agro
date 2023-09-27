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

const getResumeById = async (req, res) => {
  const { resumeId } = req.params;
  const resume = await resumesService.getResumeById(resumeId);
  res.status(200).json(resume);
};

const removeResumeById = async (req, res) => {
  const { resumeId } = req.params;
  await resumesService.removeResumeById(resumeId);
  res.status(204).send();
};

const updateResumeIsViewed = async (req, res) => {
  const { resumeId } = req.params;
  const { _id: userId } = req.user;
  await resumesService.updateResumeIsViewed({
    resumeId,
    userId,
  });
  res.status(204).send();
};

const updateResumeIsFavorite = async (req, res) => {
  const { resumeId } = req.params;
  await resumesService.updateResumeIsFavorite(resumeId);
  res.status(200).send();
};

module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  removeResumeById,
  updateResumeIsViewed,
  updateResumeIsFavorite,
};
