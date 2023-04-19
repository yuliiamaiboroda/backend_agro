const { createHttpException } = require("../helpers/utils");
const { RESPONSE_ERRORS, ROLES_LIST } = require("../helpers/constants");

const checkAccessRight =
  (...userRoles) =>
  (req, res, next) => {
    try {
      const { role } = req.user;
      if (role !== ROLES_LIST.admin && !userRoles.includes(role)) {
        throw createHttpException(RESPONSE_ERRORS.accessDenied);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = { checkAccessRight };
