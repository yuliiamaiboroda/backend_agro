const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users');
const { controllerExceptionWrapper } = require('../../helpers/utils');
const {
  validateBody,
  authUser,
  checkAccessRight,
  validateObjectId,
} = require('../../middlewares');
const {
  userRegisterSchema,
  updateUserSchema,
} = require('../../helpers/schemas');

router
  .use(authUser)
  .use(checkAccessRight())
  .put(
    '/',
    validateBody(userRegisterSchema),
    controllerExceptionWrapper(userController.createUser)
  )
  .get('/', controllerExceptionWrapper(userController.getAllUsers))
  .get(
    '/:id',
    validateObjectId,
    controllerExceptionWrapper(userController.getUserById)
  )
  .delete(
    '/:id',
    validateObjectId,
    controllerExceptionWrapper(userController.removeUserById)
  )
  .patch(
    '/:id',
    validateObjectId,
    validateBody(updateUserSchema),
    controllerExceptionWrapper(userController.updateUserById)
  );

module.exports = router;
