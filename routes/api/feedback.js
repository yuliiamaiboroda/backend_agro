const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  validateBody,
  authUser,
  checkAccessRight,
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
    controllerExceptionWrapper(feedbackController.getCertainFeedback)
  )
  .delete(
    "/:id",
    authUser,
    checkAccessRight(),
    controllerExceptionWrapper(feedbackController.deleteById)
  );

module.exports = router;
