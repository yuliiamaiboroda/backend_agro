const { FeedbackModel } = require("../../models");
const { NotFoundError, IsAlreadyViewedError } = require("../../helpers/utils");

const createFeeback = async (body) => {
  const { name, contactPhone, contactMail, comment, agreement } = body;

  const newFeedback = await FeedbackModel.create({
    name,
    contactPhone,
    contactMail,
    comment,
    agreement,
  });

  return await FeedbackModel.findById(newFeedback._id, {
    agreement: 0,
    viewedBy: 0,
    createdAt: 0,
  });
};

const getAllFeedbacks = async (id, query) => {
  const { isFavorite, sort = "desc", skip = 0, limit = 20 } = query;
  const matchQuery = {};

  isFavorite && (matchQuery.isFavorite = true);

  const feedbacks = await FeedbackModel.aggregate()
    .match(matchQuery)
    .addFields({
      isReviewed: {
        $cond: {
          if: {
            $first: {
              $filter: {
                input: "$viewedBy",
                as: "viewedUserId",
                cond: { $eq: ["$$viewedUserId", id] },
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
      name: 1,
      comment: 1,
      isReviewed: 1,
      isFavorite: 1,
    })
    .skip(Number(skip))
    .limit(Number(limit));

  const total = await FeedbackModel.find(matchQuery)
    .sort({ createdAt: sort })
    .count("total");

  return { feedbacks, total, skip: Number(skip), limit: Number(limit) };
};

const getFeedbackById = async (id) => {
  const feedback = await FeedbackModel.findById(id, { viewedBy: 0 });

  if (!feedback) throw new NotFoundError();

  return feedback;
};

const removeFeedbackById = async (id) => {
  const feedback = await FeedbackModel.findById(id);

  if (!feedback) throw new NotFoundError();

  await FeedbackModel.findByIdAndRemove(id);

  return { message: "Feedback deleted" };
};

const updateFeedbackIsFavorite = async (id) => {
  const feedback = await FeedbackModel.findById(id);

  if (!feedback) throw new NotFoundError();

  await FeedbackModel.findByIdAndUpdate(
    id,
    {
      isFavorite: !feedback.isFavorite,
    },
    { runValidators: true }
  );

  return { message: "Feedback isFavorite status updated" };
};

const updateFeedbackIsViewed = async (feedbackId, userId) => {
  const feedback = await FeedbackModel.findById(feedbackId);

  if (!feedback) throw new NotFoundError();

  const isViewedFeedback = feedback.viewedBy.some(
    (el) => el.valueOf() === userId.valueOf()
  );

  if (isViewedFeedback) throw new IsAlreadyViewedError();

  await FeedbackModel.findByIdAndUpdate(
    feedbackId,
    {
      $push: { viewedBy: userId },
    },
    { runValidators: true }
  );

  return { message: "Feedback isViewed status updated" };
};

module.exports = {
  createFeeback,
  getAllFeedbacks,
  getFeedbackById,
  removeFeedbackById,
  updateFeedbackIsFavorite,
  updateFeedbackIsViewed,
};
