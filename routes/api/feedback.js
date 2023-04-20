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
    "/create",
    validateBody(sendFeedBackSchema),
    controllerExceptionWrapper(feedbackController.sendFeedBack)
  )
  .get(
    "/all",
    authUser,
    checkAccessRight(),
    controllerExceptionWrapper(feedbackController.getListOfFeedBack)
  )
  .get(
    "/:id",
    authUser,
    checkAccessRight(),
    validateObjectId,
    controllerExceptionWrapper(feedbackController.getCertainFeedback)
  )
  .delete(
    "/:id",
    authUser,
    checkAccessRight(),
    validateObjectId,
    controllerExceptionWrapper(feedbackController.deleteById)
  );

module.exports = router;
