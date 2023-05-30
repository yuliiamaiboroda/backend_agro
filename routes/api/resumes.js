const express = require("express");
const router = express.Router();

const { controllerExceptionWrapper } = require("../../helpers/utils");
const { ROLES_LIST } = require("../../helpers/constants");
const { createResumeSchema } = require("../../helpers/schemas");
const {
  authUser,
  checkAccessRight,
  validateObjectId,
  validateBody,
  resumeUploader,
} = require("../../middlewares");
const {
  create,
  updateViews,
  getAll,
  getCertainById,
  removeById,
  updateIsFavorite,
} = require("../../controllers/resumes");

router
  .post(
    "/",
    resumeUploader,
    validateBody(createResumeSchema),
    controllerExceptionWrapper(create)
  )
  .use(authUser, checkAccessRight(ROLES_LIST.applyManager))
  .get("/all", controllerExceptionWrapper(getAll))
  .get(
    "/certain/:resumeId",
    validateObjectId,
    controllerExceptionWrapper(getCertainById)
  )
  .delete(
    "/certain/:resumeId",
    validateObjectId,
    controllerExceptionWrapper(removeById)
  )
  .patch(
    "/certain/views/:resumeId",
    validateObjectId,
    controllerExceptionWrapper(updateViews)
  )
  .patch(
    "/certain/favorite/:resumeId",
    validateObjectId,
    controllerExceptionWrapper(updateIsFavorite)
  );

module.exports = router;
