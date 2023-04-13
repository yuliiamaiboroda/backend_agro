const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  getAll,
  getCertain,
  create,
  update,
  remove,
} = require("../../controllers/products");

router.get("/all", controllerExceptionWrapper(getAll));

router.get("/:productId", controllerExceptionWrapper(getCertain));

router.post("/", controllerExceptionWrapper(create));

router.patch("/:productId", controllerExceptionWrapper(update));

router.delete("/:productId", controllerExceptionWrapper(remove));

module.exports = router;
