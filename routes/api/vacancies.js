const express = require("express");
const router = express.Router();
const vacancyController = require("../../controllers/vacancies");
const { controllerExceptionWrapper } = require("../../helpers/utils");
const { createVacancySchema } = require("../../helpers/schemas");
const { validateBody, authUser } = require("../../middlewares");

router
  .get("/all", controllerExceptionWrapper(vacancyController.getAllVacancies))
  .post(
    "/create",
    authUser,
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.createVacancy)
  )
  .delete(
    "/:id",
    authUser,
    controllerExceptionWrapper(vacancyController.deleteVacancyById)
  );

module.exports = router;
