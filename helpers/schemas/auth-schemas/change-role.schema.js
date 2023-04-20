const Joi = require("joi");
const { FieldErrors } = require("../../utils");
const { USER_ROLES } = require("../../constants");

const userChangeRoleSchema = Joi.object({
  role: Joi.string()
    .trim()
    .valid(...USER_ROLES)
    .required()
    .messages(
      new FieldErrors("role")
        .string()
        .valid(...USER_ROLES)
        .required()
        .get()
    ),
});

module.exports = {
  userChangeRoleSchema,
};
