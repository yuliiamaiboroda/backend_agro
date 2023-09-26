const express = require('express');
const router = express.Router();

const { controllerExceptionWrapper } = require('../../helpers/utils');
const { ROLES_LIST } = require('../../helpers/constants');
const { createResumeSchema } = require('../../helpers/schemas');
const {
  authUser,
  checkAccessRight,
  validateObjectId,
  validateBody,
  resumeUploader,
} = require('../../middlewares');
const resumesController = require('../../controllers/resumes');

router
  .put(
    '/',
    resumeUploader,
    validateBody(createResumeSchema),
    controllerExceptionWrapper(resumesController.createResume)
  )
  .use(authUser, checkAccessRight(ROLES_LIST.applyManager))
  .get('/', controllerExceptionWrapper(resumesController.getAll))
  .get(
    '/certain/:resumeId',
    validateObjectId,
    controllerExceptionWrapper(resumesController.getCertainById)
  )
  .delete(
    '/certain/:resumeId',
    validateObjectId,
    controllerExceptionWrapper(resumesController.removeById)
  )
  .patch(
    '/certain/views/:resumeId',
    validateObjectId,
    controllerExceptionWrapper(resumesController.updateViews)
  )
  .patch(
    '/certain/favorite/:resumeId',
    validateObjectId,
    controllerExceptionWrapper(resumesController.updateIsFavorite)
  );

module.exports = router;
