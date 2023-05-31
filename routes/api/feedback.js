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
  .get(
    "/all",
    authUser,
    checkAccessRight(),
    controllerExceptionWrapper(feedbackController.getAll)
  )
  .get(
    "/:id",
    authUser,
    checkAccessRight(),
    validateObjectId,
    controllerExceptionWrapper(feedbackController.getCertainById)
  )
  .delete(
    "/:id",
    authUser,
    checkAccessRight(),
    validateObjectId,
    controllerExceptionWrapper(feedbackController.removeById)
  )
  .patch(
    "/:id",
    authUser,
    checkAccessRight(),
    validateObjectId,
    controllerExceptionWrapper(feedbackController.updateViews)
  )
  .patch(
    "/favorite/:id",
    authUser,
    checkAccessRight(),
    validateObjectId,
    controllerExceptionWrapper(feedbackController.updateIsFavorite)
  );

module.exports = router;
