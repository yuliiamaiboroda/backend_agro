const { CATEGORY_LIST, NOTICE_CATEGORIES } = require("./vacancies-categories");
const { ROLES_LIST, USER_ROLES } = require("./user-roles");
const { cloudinary } = require("./cloudinary");

module.exports = {
  CATEGORY_LIST,
  NOTICE_CATEGORIES,
  ROLES_LIST,
  USER_ROLES,
  cloudinary,
};
