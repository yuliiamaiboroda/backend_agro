const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const { authUser, checkAccessRight } = require("../../middlewares");
const {
  getAll,
  create,
  getCertain,
  remove,
  update,
} = require("../../controllers/services");
const { ROLES_LIST } = require("../../helpers/constants");
const { servicesUploader } = require("../../middlewares/upload-services-image.middleware");

router
  .get("/getAll", controllerExceptionWrapper(getAll))
  .post(
    "/create",
    authUser,
    checkAccessRight(ROLES_LIST.servicesManager),
    servicesUploader.single("image"),
    controllerExceptionWrapper(create)
  )
  .get(
    "/:serviceId",
    authUser,
    checkAccessRight(ROLES_LIST.servicesManager),
    controllerExceptionWrapper(getCertain)
  )
  .delete(
    "/:serviceId",
    authUser,
    checkAccessRight(ROLES_LIST.servicesManager),
    controllerExceptionWrapper(remove)
  )
  .patch(
    "/:serviceId",
    authUser,
    checkAccessRight(ROLES_LIST.servicesManager),
    servicesUploader.single("image"),
    controllerExceptionWrapper(update)
  );

module.exports = router;
