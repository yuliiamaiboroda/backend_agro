const express = require("express");
const router = express.Router();
const { controllerExceptionWrapper } = require("../../helpers/utils");
const {
  createProductSchema,
  updateProductSchema,
} = require("../../helpers/schemas");
const { ROLES_LIST } = require("../../helpers/constants");
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
  checkAccessRight,
  validateObjectId,
} = require("../../middlewares");

router.get("/all", controllerExceptionWrapper(getAll));

router.get(
  "/certain/:productId",
  validateObjectId,
  controllerExceptionWrapper(getCertain)
);

router.post(
  "/certain",
  authUser,
  checkAccessRight(ROLES_LIST.productsManager),
  productUploader,
  validateBody(createProductSchema),
  controllerExceptionWrapper(create)
);

router.patch(
  "/certain/:productId",
  authUser,
  checkAccessRight(ROLES_LIST.productsManager),
  validateObjectId,
  productUploader,
  validateBody(updateProductSchema),
  controllerExceptionWrapper(update)
);

router.delete(
  "/certain/:productId",
  authUser,
  checkAccessRight(ROLES_LIST.productsManager),
  validateObjectId,
  controllerExceptionWrapper(remove)
);

module.exports = router;
