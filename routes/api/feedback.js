const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  validateBody,
  authUser,
  checkAccessRight,
  validateObjectId,
} = require("../../middlewares");
const { sendFeedBackSchema } = require("../../helpers/schemas");
const feedbackController = require("../../controllers/feedback");

router
  .put(
    "/",
    validateBody(sendFeedBackSchema),
    controllerExceptionWrapper(feedbackController.createFeedback)
  )
  .use(authUser, checkAccessRight())
  .get("/", controllerExceptionWrapper(feedbackController.getAllFeedbacks))
  .get(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(feedbackController.getFeedbackById)
  )
  .delete(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(feedbackController.removeFeedbackById)
  )
  .patch(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(feedbackController.updateFeedbackIsViewed)
  )
  .patch(
    "/favorite/:id",
    validateObjectId,
    controllerExceptionWrapper(feedbackController.updateFeedbackIsFavorite)
  );

module.exports = router;
