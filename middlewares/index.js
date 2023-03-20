const { authUser } = require("./auth-user.middleware");
const { globalErrorHandler } = require("./global-error-handler.middleware");
const { validateBody } = require("./validate-body.middleware");

module.exports = {
  globalErrorHandler,
  validateBody,
  authUser,
};
