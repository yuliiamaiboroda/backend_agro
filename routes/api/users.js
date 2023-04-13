const express = require("express");
const router = express.Router();
const userController = require("../../controllers/auth");
const { controllerExceptionWrapper } = require("../../helpers/utils");
const { validateBody, authUser } = require("../../middlewares");
const {
  userRegisterSchema,
  userLogInSchema,
  userChangeRoleSchema,
} = require("../../helpers/schemas");

router
  .post(
    "/register",
    validateBody(userRegisterSchema),
    controllerExceptionWrapper(userController.register)
  )
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
    controllerExceptionWrapper(userController.getAllUser)
  )
  .delete(
    "/:id",
    authUser,
    controllerExceptionWrapper(userController.deleteUserById)
  )
  .patch(
    "/:id",
    authUser,
    validateBody(userChangeRoleSchema),
    controllerExceptionWrapper(userController.changeRoleOfUserById)
  );

module.exports = router;
