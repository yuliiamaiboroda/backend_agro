const { addContactSchema } = require("./add-contact.shema");
const { userChangeRoleSchema } = require("./auth-schemas/change-role.schema");
const { userLogInSchema } = require("./auth-schemas/login.schema");
const { userRegisterSchema } = require("./auth-schemas/register.schema");
const {
  createVacancySchema,
} = require("./vacancy-schemas/create-vacancy.shema");

module.exports = {
  addContactSchema,
  userLogInSchema,
  userRegisterSchema,
  userChangeRoleSchema,
  createVacancySchema,
};
