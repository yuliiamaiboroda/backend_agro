const { updateViews } = require('./update-views');
const { getAll } = require('./get-all');
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

module.exports = {
  createResume,
  updateViews,
  getAll,
  getCertainById,
  removeById,
  updateIsFavorite,
};
