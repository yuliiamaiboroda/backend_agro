const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const updateUsersPasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .trim()
    .pattern(/^\d*(?=.*[a-z])(?=.*[A-Z])\S+\D*\d*$/)
    .min(7)
    .max(32)
    .required()
    .messages(
      new FieldErrors("Old password")
        .string()
        .pattern("capital letter", "small letter and number")
        .min(7)
        .max(32)
        .required()
        .get()
    ),
  newPassword: Joi.string()
    .trim()
    .pattern(/^\d*(?=.*[a-z])(?=.*[A-Z])\S+\D*\d*$/)
    .min(7)
    .max(32)
    .required()
    .messages(
      new FieldErrors("New password")
        .string()
        .pattern("capital letter", "small letter and number")
        .min(7)
        .max(32)
        .required()
        .get()
    ),
}).messages(new FieldErrors("login").object().extraFields().get());

module.exports = {
  updateUsersPasswordSchema,
};
