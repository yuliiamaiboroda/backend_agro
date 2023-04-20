const express = require("express");
const router = express.Router();
const vacancyController = require("../../controllers/vacancies");
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  createVacancySchema,
  changeVacancyCategotySchema,
} = require("../../helpers/schemas");
const {
  validateBody,
  authUser,
  checkAccessRight,
} = require("../../middlewares");
const { ROLES_LIST } = require("../../helpers/constants");

router
  .get("/all", controllerExceptionWrapper(vacancyController.getAllVacancies))
  .get(
    "/actual",
    controllerExceptionWrapper(vacancyController.getActualVacancies)
  )
  .get("/:id", controllerExceptionWrapper(vacancyController.getCertain))
  .post(
    "/create",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.createVacancy)
  )
  .patch(
    "/category/:id",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    validateBody(changeVacancyCategotySchema),
    controllerExceptionWrapper(vacancyController.changeVacancyCategoty)
  )
  .delete(
    "/:id",
    authUser,
    checkAccessRight(ROLES_LIST.applyManager),
    controllerExceptionWrapper(vacancyController.deleteVacancyById)
  );

module.exports = router;
