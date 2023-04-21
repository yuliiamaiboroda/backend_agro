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
  getCertainById,
  create,
  updateById,
  removeById,
} = require("../../controllers/products");
const {
  authUser,
  validateBody,
  productUploader,
  checkAccessRight,
  validateObjectId,
} = require("../../middlewares");

router
  .get("/all", controllerExceptionWrapper(getAll))
  .get(
    "/certain/:productId",
    validateObjectId,
    controllerExceptionWrapper(getCertainById)
  )
  .post(
    "/certain",
    authUser,
    checkAccessRight(ROLES_LIST.productsManager),
    productUploader,
    validateBody(createProductSchema),
    controllerExceptionWrapper(create)
  )
  .patch(
    "/certain/:productId",
    authUser,
    checkAccessRight(ROLES_LIST.productsManager),
    validateObjectId,
    productUploader,
    validateBody(updateProductSchema),
    controllerExceptionWrapper(updateById)
  )
  .delete(
    "/certain/:productId",
    authUser,
    checkAccessRight(ROLES_LIST.productsManager),
    validateObjectId,
    controllerExceptionWrapper(removeById)
  );

module.exports = router;
