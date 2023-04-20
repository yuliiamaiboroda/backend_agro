const express = require("express");
const router = express.Router();

const { controllerExceptionWrapper } = require("../../helpers/utils");
const { ROLES_LIST } = require("../../helpers/constants");
const {
  authUser,
  checkAccessRight,
  validateObjectId,
} = require("../../middlewares");
const {
  create,
  getAll,
  getCertain,
  remove,
} = require("../../controllers/resume");

router.post("/", controllerExceptionWrapper(create));

router.get(
  "/all",
  authUser,
  checkAccessRight(ROLES_LIST.applyManager),
  controllerExceptionWrapper(getAll)
);

router.get(
  "/certain/:resumeId",
  authUser,
  checkAccessRight(ROLES_LIST.applyManager),
  validateObjectId,
  controllerExceptionWrapper(getCertain)
);

router.delete(
  "/certain/:resumeId",
  authUser,
  checkAccessRight(ROLES_LIST.applyManager),
  validateObjectId,
  controllerExceptionWrapper(remove)
);

module.exports = router;
