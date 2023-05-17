const express = require("express");
const router = express.Router();
const vacancyController = require("../../controllers/vacancies");
const { controllerExceptionWrapper } = require("../../helpers/utils");
const { createVacancySchema } = require("../../helpers/schemas");
const {
  validateBody,
  authUser,
  checkAccessRight,
  validateObjectId,
} = require("../../middlewares");
const { ROLES_LIST } = require("../../helpers/constants");

router
  .get("/all", controllerExceptionWrapper(vacancyController.getAll))
  .get("/actual", controllerExceptionWrapper(vacancyController.getActual))
  .get(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(vacancyController.getCertainById)
  )
  .post(
    "/create",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.create)
  )
  .put(
    "/:id",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    validateObjectId,
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.updateVacancyById)
  )
  .delete(
    "/:id",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    validateObjectId,
    controllerExceptionWrapper(vacancyController.removeById)
  );

module.exports = router;
