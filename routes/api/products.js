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
  .get('/', controllerExceptionWrapper(productController.getAllProducts))
  .get(
    '/:productId',
    validateObjectId,
    controllerExceptionWrapper(productController.getCertainProductById)
  )
  .use(authUser, checkAccessRight(ROLES_LIST.productsManager))
  .put(
    '/',
    productUploader,
    validateBody(createProductSchema),
    controllerExceptionWrapper(productController.addNewProduct)
  )
  .post(
    '/:productId',
    validateObjectId,
    productUploader,
    validateBody(updateProductSchema),
    controllerExceptionWrapper(productController.updateCertainProductById)
  )
  .delete(
    '/:productId',
    validateObjectId,
    controllerExceptionWrapper(productController.removeCertainProductById)
  );

module.exports = router;
