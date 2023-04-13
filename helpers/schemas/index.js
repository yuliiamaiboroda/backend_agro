const { userChangeRoleSchema } = require("./auth-schemas/change-role.schema");
const { userLogInSchema } = require("./auth-schemas/login.schema");
const { userRegisterSchema } = require("./auth-schemas/register.schema");
const {
  changeVacancyCategotySchema,
} = require("./vacancy-schemas/change-vacancy-category.schema");
const {
  createVacancySchema,
} = require("./vacancy-schemas/create-vacancy.shema");

module.exports = {
  userLogInSchema,
  userRegisterSchema,
  userChangeRoleSchema,
  createVacancySchema,
  changeVacancyCategotySchema,
};
