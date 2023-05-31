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
  .post(
    "/",
    validateBody(sendFeedBackSchema),
    controllerExceptionWrapper(feedbackController.create)
  )
  .use(authUser, checkAccessRight())
  .get("/all", controllerExceptionWrapper(feedbackController.getAll))
  .get(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(feedbackController.getCertainById)
  )
  .delete(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(feedbackController.removeById)
  )
  .patch(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(feedbackController.updateViews)
  )
  .patch(
    "/favorite/:id",
    validateObjectId,
    controllerExceptionWrapper(feedbackController.updateIsFavorite)
  );

module.exports = router;
