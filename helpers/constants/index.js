const { CATEGORY_LIST, NOTICE_CATEGORIES } = require("./vacancies-categories");
const { ROLES_LIST, USER_ROLES } = require("./user-roles");
const { cloudinary } = require("./cloudinary");
const { FORBIDDEN_DOMAINS } = require("./forbidden-domains");

module.exports = {
  CATEGORY_LIST,
  NOTICE_CATEGORIES,
  ROLES_LIST,
  USER_ROLES,
  cloudinary,
  FORBIDDEN_DOMAINS,
};
