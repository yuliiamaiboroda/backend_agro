const express = require("express");
const router = express.Router();
const userController = require("../../controllers/auth");
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
} = require("../../helpers/schemas");

router
  .post(
    "/register",
    validateBody(userRegisterSchema),
    authUser,
    checkAccessRight(),
    controllerExceptionWrapper(userController.register)
  )
  .get("/current", authUser, controllerExceptionWrapper(userController.current))
  .post(
    "/login",
    validateBody(userLogInSchema),
    controllerExceptionWrapper(userController.login)
  )
  .post("/logout", authUser, controllerExceptionWrapper(userController.logout))
  .post("/refresh", controllerExceptionWrapper(userController.refreshUser))
  .post(
    "/updatePassword",
    validateBody(updateUsersPasswordSchema),
    authUser,
    controllerExceptionWrapper(userController.updatePassword)
  )
  .get(
    "/getAllUser",
    authUser,
    checkAccessRight(),
    controllerExceptionWrapper(userController.getAll)
  )
  .get(
    "/certain/:userId",
    authUser,
    checkAccessRight(),
    validateObjectId,
    controllerExceptionWrapper(userController.getCertainById)
  )
  .delete(
    "/:id",
    authUser,
    checkAccessRight(),
    validateObjectId,
    controllerExceptionWrapper(userController.removeById)
  )
  .patch(
    "/:id",
    authUser,
    checkAccessRight(),
    validateBody(updateUserSchema),
    validateObjectId,
    controllerExceptionWrapper(userController.updateById)
  );

module.exports = router;
