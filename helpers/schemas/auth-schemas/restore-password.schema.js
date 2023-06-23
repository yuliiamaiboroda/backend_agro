const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const restorePasswordSchema = Joi.object({
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
}).messages(new FieldErrors("login").object().extraFields().get());

module.exports = {
  restorePasswordSchema,
};
