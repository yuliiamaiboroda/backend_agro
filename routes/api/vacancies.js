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
  .get("/titles", controllerExceptionWrapper(vacancyController.getTitles))
  .get(
    "/category/:categoryName",
    controllerExceptionWrapper(vacancyController.getByCategory)
  )
  .get(
    "/certain/:id",
    validateObjectId,
    controllerExceptionWrapper(vacancyController.getCertainById)
  )
  .use(authUser, checkAccessRight(ROLES_LIST.applyManager))
  .post(
    "/create",
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.create)
  )
  .put(
    "/:id",
    validateObjectId,
    validateBody(createVacancySchema),
    controllerExceptionWrapper(vacancyController.updateById)
  )
  .delete(
    "/:id",
    validateObjectId,
    controllerExceptionWrapper(vacancyController.removeById)
  );

module.exports = router;
