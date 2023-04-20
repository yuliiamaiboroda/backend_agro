const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const { authUser } = require("../../middlewares");

const {
  getAll,
  create,
  getCertain,
  remove,
  update,
} = require("../../controllers/services");

router
  .get("/getAll", controllerExceptionWrapper(getAll))
  .post("/create", authUser, controllerExceptionWrapper(create))
  .get("/:serviceId", authUser, controllerExceptionWrapper(getCertain))
  .delete("/:serviceId/delete", authUser, controllerExceptionWrapper(remove))
  .patch("/:serviceId/update", authUser, controllerExceptionWrapper(update));

module.exports = router;
