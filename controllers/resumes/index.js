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

  const resumes = await resumesService.getAllResumes({
    userId,
    ...req.query,
  });
  res.status(200).json(resumes);
};

const getResumeById = async (req, res) => {
  const { id } = req.params;
  const resume = await resumesService.getResumeById(id);
  res.status(200).json(resume);
};

const removeResumeById = async (req, res) => {
  const { id } = req.params;
  await resumesService.removeResumeById(id);
  res.status(204).send();
};

const updateResumeIsViewed = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  await resumesService.updateResumeIsViewed(id, userId);
  res.status(204).send();
};

const updateResumeIsFavorite = async (req, res) => {
  const { id } = req.params;
  await resumesService.updateResumeIsFavorite(id);
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
