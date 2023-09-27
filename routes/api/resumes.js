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
  .get('/', controllerExceptionWrapper(resumesController.getAllResumes))
  .get(
    '/:resumeId',
    validateObjectId,
    controllerExceptionWrapper(resumesController.getResumeById)
  )
  .delete(
    '/:resumeId',
    validateObjectId,
    controllerExceptionWrapper(resumesController.removeResumeById)
  )
  .post(
    '/:resumeId/views',
    validateObjectId,
    controllerExceptionWrapper(resumesController.updateResumeIsViewed)
  )
  .post(
    '/:resumeId/favorite',
    validateObjectId,
    controllerExceptionWrapper(resumesController.updateResumeIsFavorite)
  );

module.exports = router;
