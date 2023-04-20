const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const userLogInSchema = Joi.object({
  email: Joi.string()
    .trim()
    .pattern(/^(\w+([.-]?\w+){1,})*@\w+([.-]?\w+)*(.\w{2,3})+$/)
    .min(10)
    .max(63)
    .email()
    .required()
    .messages(
      new FieldErrors("email")
        .string()
        .pattern("capital letter", "small letter and number")
        .min(10)
        .max(63)
        .email()
        .required()
        .get()
    ),
  password: Joi.string()
    .trim()
    .pattern(/^\d*(?=.*[a-z])(?=.*[A-Z])\S+\D*\d*$/)
    .min(7)
    .max(32)
    .required()
    .messages(
      new FieldErrors("password")
        .string()
        .pattern("capital letter", "small letter and number")
        .min(7)
        .max(32)
        .required()
        .get()
    ),
}).messages(new FieldErrors("login").object().extraFields().get());

module.exports = {
  userLogInSchema,
};
