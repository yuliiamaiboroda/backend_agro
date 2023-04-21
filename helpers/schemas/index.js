const { userChangeRoleSchema } = require("./auth-schemas/change-role.schema");
const { userLogInSchema } = require("./auth-schemas/login.schema");
const { userRegisterSchema } = require("./auth-schemas/register.schema");
const {
  changeVacancyCategotySchema,
} = require("./vacancy-schemas/change-vacancy-category.schema");
const {
  createVacancySchema,
} = require("./vacancy-schemas/create-vacancy.shema");
const {
  createProductSchema,
} = require("./products-schemas/create-product.schema");
const {
  updateProductSchema,
} = require("./products-schemas/update-product.schema");
const {
  sendFeedBackSchema,
} = require("./feedback-schemas/send-feedback.schema");
const { createResumeSchema } = require("./resume-schemas/create-resume.schema");

module.exports = {
  userLogInSchema,
  userRegisterSchema,
  userChangeRoleSchema,
  createVacancySchema,
  changeVacancyCategotySchema,
  createProductSchema,
  updateProductSchema,
  sendFeedBackSchema,
  createResumeSchema,
};
