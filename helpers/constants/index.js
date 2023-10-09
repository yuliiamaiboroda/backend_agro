const { CATEGORY_LIST, NOTICE_CATEGORIES } = require('./vacancies-categories');
const { ROLES_LIST, USER_ROLES } = require('./user-roles');
const { cloudinary } = require('./cloudinary');
const { FORBIDDEN_DOMAINS } = require('./forbidden-domains');
const { UPDATE_DEFAULT_CONFIG } = require('./update-default-config');

module.exports = {
  CATEGORY_LIST,
  NOTICE_CATEGORIES,
  ROLES_LIST,
  USER_ROLES,
  cloudinary,
  FORBIDDEN_DOMAINS,
  UPDATE_DEFAULT_CONFIG,
};
