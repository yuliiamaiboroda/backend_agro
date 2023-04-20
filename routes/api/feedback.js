const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const { validateBody, authUser } = require("../../middlewares");
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
    controllerExceptionWrapper(feedbackController.getListOfFeedBack)
  )
  .get(
    "/:id",
    authUser,
    controllerExceptionWrapper(feedbackController.getCertainFeedback)
  )
  .delete(
    "/:id",
    authUser,
    controllerExceptionWrapper(feedbackController.deleteById)
  );

module.exports = router;
