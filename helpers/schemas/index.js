const { updateUserSchema } = require("./auth-schemas/update-user.schema");
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
const {
  updateUsersPasswordSchema,
} = require("./auth-schemas/update-password.schema");
const {
  createServiceSchema,
} = require("./services-schemas/create-service-schema");
const {
  updateServiceSchema,
} = require("./services-schemas/update-service-schema copy");

module.exports = {
  userLogInSchema,
  userRegisterSchema,
  updateUsersPasswordSchema,
  updateUserSchema,
  createVacancySchema,
  changeVacancyCategotySchema,
  createProductSchema,
  updateProductSchema,
  sendFeedBackSchema,
  createResumeSchema,
  createServiceSchema,
  updateServiceSchema,
};
