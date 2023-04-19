const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  createProductSchema,
  updateProductSchema,
} = require("../../helpers/schemas");
const {
  getAll,
  getCertain,
  create,
  update,
  remove,
} = require("../../controllers/products");
const {
  authUser,
  validateBody,
  productUploader,
} = require("../../middlewares");

router.get("/all", controllerExceptionWrapper(getAll));

router.get("/certain/:productId", controllerExceptionWrapper(getCertain));

router.post(
  "/certain",
  authUser,
  productUploader.single("image"),
  validateBody(createProductSchema),
  controllerExceptionWrapper(create)
);

router.patch(
  "/certain/:productId",
  authUser,
  productUploader.single("image"),
  validateBody(updateProductSchema),
  controllerExceptionWrapper(update)
);

router.delete(
  "/certain/:productId",
  authUser,
  controllerExceptionWrapper(remove)
);

module.exports = router;
