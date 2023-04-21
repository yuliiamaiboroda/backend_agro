const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  authUser,
  checkAccessRight,
  validateObjectId,
} = require("../../middlewares");
const {
  getAll,
  create,
  getCertainById,
  removeById,
  updateById,
} = require("../../controllers/services");
const { ROLES_LIST } = require("../../helpers/constants");
const {
  servicesUploader,
} = require("../../middlewares/upload-services-image.middleware");

router
  .get("/getAll", controllerExceptionWrapper(getAll))
  .post(
    "/create",
    authUser,
    checkAccessRight(ROLES_LIST.servicesManager),
    servicesUploader,
    controllerExceptionWrapper(create)
  )
  .get(
    "/:serviceId",
    authUser,
    checkAccessRight(ROLES_LIST.servicesManager),
    validateObjectId,
    controllerExceptionWrapper(getCertainById)
  )
  .delete(
    "/:serviceId",
    authUser,
    checkAccessRight(ROLES_LIST.servicesManager),
    validateObjectId,
    controllerExceptionWrapper(removeById)
  )
  .patch(
    "/:serviceId",
    authUser,
    checkAccessRight(ROLES_LIST.servicesManager),
    validateObjectId,
    servicesUploader,
    controllerExceptionWrapper(updateById)
  );

module.exports = router;
