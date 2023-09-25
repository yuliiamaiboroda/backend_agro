const feedbackServices = require("../../services/feedback");
const { getAll } = require("./get-all");

const getAllFeedbacks = async (req, res) => {
  const feedbacks = await feedbackServices.getAllFeedbacks(
    req.user._id,
    req.query
  );

  res.status(200).json(feedbacks);
};

const createFeedback = async (req, res) => {
  const feedback = await feedbackServices.createFeeback(req.body);

  res.status(201).json(feedback);
};

const getFeedbackById = async (req, res) => {
  const feedback = await feedbackServices.getFeedbackById(req.params.id);

  res.status(200).json(feedback);
};

const removeFeedbackById = async (req, res) => {
  await feedbackServices.removeFeedbackById(req.params.id);

  res.status(204).send();
};

const updateFeedbackIsFavorite = async (req, res) => {
  await feedbackServices.updateFeedbackIsFavorite(req.params.id);

  res.status(204).send();
};

const updateFeedbackIsViewed = async (req, res) => {
  await feedbackServices.updateFeedbackIsViewed(req.params.id, req.user._id);

  res.status(204).send();
};

module.exports = {
  getAll,
  getAllFeedbacks,
  createFeedback,
  removeFeedbackById,
  getFeedbackById,
  updateFeedbackIsViewed,
  updateFeedbackIsFavorite,
};
