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
  .get("/", controllerExceptionWrapper(vacancyController.getAllVacancies))
  .get(
    "/titles",
    controllerExceptionWrapper(vacancyController.getVacanciesTitles)
  )
  .get(
    "/category/:categoryName",
    controllerExceptionWrapper(vacancyController.getVacanciesByCategory)
  )
  .get(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(vacancyController.getVacancyById)
  )
  .use(authUser, checkAccessRight(ROLES_LIST.applyManager))
  .put(
    "/",
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.createVacancy)
  )
  .post(
    "/:id",
    validateObjectId,
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.updateVacancyById)
  )
  .delete(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(vacancyController.removeVacancyById)
  );

module.exports = router;
