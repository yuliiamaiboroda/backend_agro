const { authUser } = require("./auth-user.middleware");
const { globalErrorHandler } = require("./global-error-handler.middleware");
const { validateBody } = require("./validate-body.middleware");
const { productUploader } = require("./upload-product-image.middleware");
const { resumeUploader } = require("./upload-resume-file.middleware");
const { checkAccessRight } = require("./check-access-right.middleware");
const { validateObjectId } = require("./validate-object-id.middleware");

module.exports = {
  globalErrorHandler,
  validateBody,
  authUser,
  productUploader,
  resumeUploader,
  checkAccessRight,
  validateObjectId,
};
