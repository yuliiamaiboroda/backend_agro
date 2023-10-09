const resumesService = require('../../services/resumes');

const createResume = async (req, res) => {
  const resume = await resumesService.createResume({
    ...req.body,
    file: req.file,
  });
  res.status(201).json(resume);
};

const getAllResumes = async (req, res) => {
  const { _id: userId } = req.user;

  const resumes = await resumesService.getAllResumes({
    userId,
    ...req.query,
  });
  res.status(200).json(resumes);
};

const getResumeById = async (req, res) => {
  const resume = await resumesService.getResumeById(req.params.id);
  res.status(200).json(resume);
};

const removeResumeById = async (req, res) => {
  await resumesService.removeResumeById(req.params.id);
  res.status(204).send();
};

const updateResumeIsViewed = async (req, res) => {
  await resumesService.updateResumeIsViewed(req.params.id, req.user._id);
  res.status(204).send();
};

const updateResumeIsFavorite = async (req, res) => {
  await resumesService.updateResumeIsFavorite(req.params.id);
  res.status(204).send();
};

module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  removeResumeById,
  updateResumeIsViewed,
  updateResumeIsFavorite,
};
