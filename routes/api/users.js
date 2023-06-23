const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  validateBody,
  authUser,
  checkAccessRight,
  validateObjectId,
} = require("../../middlewares");
const {
  userRegisterSchema,
  userLogInSchema,
  updateUserSchema,
  updateUsersPasswordSchema,
  restorePasswordSchema,
} = require("../../helpers/schemas");

router
  .post(
    "/login",
    validateBody(userLogInSchema),
    controllerExceptionWrapper(userController.login)
  )
  .post("/refresh", controllerExceptionWrapper(userController.refreshUser))
  .patch(
    "/restore",
    validateBody(restorePasswordSchema),
    controllerExceptionWrapper(userController.restorePassword)
  )
  .use(authUser)
  .get("/current", controllerExceptionWrapper(userController.current))
  .post("/logout", controllerExceptionWrapper(userController.logout))
  .post(
    "/updatePassword",
    validateBody(updateUsersPasswordSchema),
    controllerExceptionWrapper(userController.updatePassword)
  )
  .use(checkAccessRight())
  .post(
    "/register",
    validateBody(userRegisterSchema),
    controllerExceptionWrapper(userController.register)
  )
  .get("/", controllerExceptionWrapper(userController.getAll))
  .get(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(userController.getCertainById)
  )
  .delete(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(userController.removeById)
  )
  .patch(
    "/:id",
    validateObjectId,
    validateBody(updateUserSchema),
    controllerExceptionWrapper(userController.updateById)
  );

module.exports = router;
