const express = require("express");
const router = express.Router();
const vacancyController = require("../../controllers/vacancies");
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  createVacancySchema,
  changeVacancyCategotySchema,
} = require("../../helpers/schemas");
const { validateBody, authUser } = require("../../middlewares");

router
  .get("/all", controllerExceptionWrapper(vacancyController.getAllVacancies))
  .post(
    "/create",
    authUser,
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.createVacancy)
  )
  .patch(
    "/category/:id",
    authUser,
    validateBody(changeVacancyCategotySchema),
    controllerExceptionWrapper(vacancyController.changeVacancyCategoty)
  )
  .delete(
    "/:id",
    authUser,
    controllerExceptionWrapper(vacancyController.deleteVacancyById)
  );

module.exports = router;
