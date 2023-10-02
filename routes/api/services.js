const express = require('express');
const router = express.Router();
const { controllerExceptionWrapper } = require('../../helpers/utils');
const {
  authUser,
  checkAccessRight,
  validateObjectId,
  validateBody,
} = require('../../middlewares');
const serviceController = require('../../controllers/services');
const { ROLES_LIST } = require('../../helpers/constants');
const {
  servicesUploader,
} = require('../../middlewares/upload-services-image.middleware');
const {
  createServiceSchema,
  updateServiceSchema,
} = require('../../helpers/schemas');

router
  .get('/', controllerExceptionWrapper(serviceController.getAllServices))
  .get('/:id', controllerExceptionWrapper(serviceController.getServiceById))
  .use(authUser, checkAccessRight(ROLES_LIST.servicesManager))
  .delete(
    '/:id',
    validateObjectId,
    controllerExceptionWrapper(serviceController.removeServiceById)
  )
  .put(
    '/',
    servicesUploader,
    validateBody(createServiceSchema),
    controllerExceptionWrapper(serviceController.createService)
  )
  .post(
    '/:id',
    validateObjectId,
    servicesUploader,
    validateBody(updateServiceSchema),
    controllerExceptionWrapper(serviceController.updateServiceById)
  );

module.exports = router;
