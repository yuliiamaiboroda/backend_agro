const express = require('express');
const router = express.Router();
const authenticationController = require('../../controllers/authentication');
const { controllerExceptionWrapper } = require('../../helpers/utils');
const { validateBody, authUser } = require('../../middlewares');
const {
  userLogInSchema,
  updateUsersPasswordSchema,
  restorePasswordSchema,
} = require('../../helpers/schemas');

router
  .post(
    '/',
    validateBody(userLogInSchema),
    controllerExceptionWrapper(authenticationController.login)
  )
  .post(
    '/refresh',
    controllerExceptionWrapper(authenticationController.refreshUser)
  )
  .patch(
    '/',
    validateBody(restorePasswordSchema),
    controllerExceptionWrapper(authenticationController.restorePassword)
  )
  .use(authUser)
  .get('/', controllerExceptionWrapper(authenticationController.getCurrentUser))
  .post('/logout', controllerExceptionWrapper(authenticationController.logout))
  .post(
    '/updatePassword',
    validateBody(updateUsersPasswordSchema),
    controllerExceptionWrapper(authenticationController.updateOwnPassword)
  );

module.exports = router;
