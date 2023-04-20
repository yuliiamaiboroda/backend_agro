const { AccessDeniedError } = require("../helpers/utils");
const { ROLES_LIST } = require("../helpers/constants");

const checkAccessRight =
  (...userRoles) =>
  (req, res, next) => {
    try {
      const { role } = req.user;
      if (role !== ROLES_LIST.admin && !userRoles.includes(role)) {
        throw new AccessDeniedError();
      }
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = { checkAccessRight };
