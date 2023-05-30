const {
  controllerExceptionWrapper,
} = require("./controller-exception-wrapper");
const { FieldErrors } = require("./validation-errors");
const {
  UnauthorizedError,
  NotFoundError,
  EmailUsedError,
  AccessDeniedError,
  FileRequiredError,
  ValidationError,
  CloudinaryFailedError,
  CustomHttpException,
  DeleteTheLastAdminAccountError,
  UpdateOwnPasswordError,
  IsAlreadyViewedError,
} = require("./http-exceptions");
const {
  removeCloudinaryFileByURL,
} = require("./remove-cloudinary-file-by-url");
const {
  uploadFileWithErrorHandling,
} = require("./upload-file-with-error-handling");

module.exports = {
  controllerExceptionWrapper,
  FieldErrors,
  UnauthorizedError,
  NotFoundError,
  EmailUsedError,
  AccessDeniedError,
  FileRequiredError,
  ValidationError,
  CloudinaryFailedError,
  CustomHttpException,
  DeleteTheLastAdminAccountError,
  UpdateOwnPasswordError,
  IsAlreadyViewedError,
  removeCloudinaryFileByURL,
  uploadFileWithErrorHandling,
};
