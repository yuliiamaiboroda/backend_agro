const express = require('express');
const router = express.Router();
const productController = require('../../controllers/products');
const { controllerExceptionWrapper } = require('../../helpers/utils');
const {
  createProductSchema,
  updateProductSchema,
} = require('../../helpers/schemas');
const { ROLES_LIST } = require('../../helpers/constants');
const {
  authUser,
  validateBody,
  productUploader,
  checkAccessRight,
  validateObjectId,
} = require('../../middlewares');

router
  .get('/', controllerExceptionWrapper(productController.getAll))
  .get(
    '/certain/:productId',
    validateObjectId,
    controllerExceptionWrapper(productController.getCertainById)
  )
  .use(authUser, checkAccessRight(ROLES_LIST.productsManager))
  .post(
    '/certain',
    productUploader,
    validateBody(createProductSchema),
    controllerExceptionWrapper(productController.create)
  )
  .patch(
    '/certain/:productId',
    validateObjectId,
    productUploader,
    validateBody(updateProductSchema),
    controllerExceptionWrapper(productController.updateById)
  )
  .delete(
    '/certain/:productId',
    validateObjectId,
    controllerExceptionWrapper(productController.removeById)
  );

module.exports = router;
