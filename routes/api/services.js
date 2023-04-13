const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");

const { getAll, create } = require("../../controllers/services");

router
  .get("/getAll", controllerExceptionWrapper(getAll))
  .post("/create", controllerExceptionWrapper(create));

module.exports = router;

