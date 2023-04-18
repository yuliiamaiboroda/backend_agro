const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const { authUser } = require("../../middlewares");

const { getAll, create } = require("../../controllers/services");

router
  .get("/getAll", controllerExceptionWrapper(getAll))
  .post("/create", authUser, controllerExceptionWrapper(create));

module.exports = router;
