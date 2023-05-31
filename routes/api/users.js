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
} = require("../../helpers/schemas");

router
  .post(
    "/login",
    validateBody(userLogInSchema),
    controllerExceptionWrapper(userController.login)
  )
  .post("/refresh", controllerExceptionWrapper(userController.refreshUser))
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
  .use(validateObjectId)
  .get("/:id", controllerExceptionWrapper(userController.getCertainById))
  .delete("/:id", controllerExceptionWrapper(userController.removeById))
  .patch(
    "/:id",
    validateBody(updateUserSchema),
    controllerExceptionWrapper(userController.updateById)
  );

module.exports = router;
