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
  .get(
    "/getAllUser",
    authUser,
    checkAccessRight(),
    controllerExceptionWrapper(userController.getAll)
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
