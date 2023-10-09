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
    '/:id',
    validateObjectId,
    controllerExceptionWrapper(productController.getProductById)
  )
  .use(authUser, checkAccessRight(ROLES_LIST.productsManager))
  .put(
    '/',
    productUploader,
    validateBody(createProductSchema),
    controllerExceptionWrapper(productController.createProduct)
  )
  .post(
    '/:id',
    validateObjectId,
    productUploader,
    validateBody(updateProductSchema),
    controllerExceptionWrapper(productController.updateProductById)
  )
  .delete(
    '/:id',
    validateObjectId,
    controllerExceptionWrapper(productController.removeProductById)
  );

module.exports = router;
