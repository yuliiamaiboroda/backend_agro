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
  getAll,
  getCertainById,
  removeById,
} = require("../../controllers/resume");

router
  .post(
    "/",
    resumeUploader,
    validateBody(createResumeSchema),
    controllerExceptionWrapper(create)
  )
  .get(
    "/all",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    controllerExceptionWrapper(getAll)
  )
  .get(
    "/certain/:resumeId",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    validateObjectId,
    controllerExceptionWrapper(getCertainById)
  )
  .delete(
    "/certain/:resumeId",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    validateObjectId,
    controllerExceptionWrapper(removeById)
  );

module.exports = router;
