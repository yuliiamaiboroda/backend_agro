const Joi = require("joi");
const { FieldErrors } = require("../../utils");
const { USER_ROLES } = require("../../constants");

const userRegisterSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^([a-zA-Z-А-Яа-яЁёЇїІіЄєҐґ']+)$/)
    .min(2)
    .max(30)
    .required()
    .messages(
      new FieldErrors("name")
        .string()
        .pattern("letters")
        .min(2)
        .max(30)
        .required()
        .get()
    ),
  surname: Joi.string()
    .trim()
    .pattern(/^([a-zA-Z-А-Яа-яЁёЇїІіЄєҐґ']+)$/)
    .min(2)
    .max(40)
    .required()
    .messages(
      new FieldErrors("surname")
        .string()
        .pattern("letters")
        .min(2)
        .max(40)
        .required()
        .get()
    ),
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
        .pattern(
          "latin letters",
          "numbers and signs",
          "at the beginning or end of the email there can be no hyphen, there must be at least 2 characters before the (@)"
        )
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
}).messages(new FieldErrors("register").object().extraFields().get());

module.exports = {
  userRegisterSchema,
};
