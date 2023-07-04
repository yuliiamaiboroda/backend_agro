const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const updateServiceSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(32)
    .messages(new FieldErrors("title").string().min(2).max(32).get()),
  description: Joi.string()
    .min(2)
    .max(2000)
    .messages(new FieldErrors("description").string().min(2).max(2000).get()),
  price: Joi.string()
    .min(2)
    .max(32)
    .messages(new FieldErrors("title").string().min(2).max(32).get()),
  contactMail: Joi.string()
    .trim()
    .pattern(/^(\w+([.-]?\w+){1,})*@\w+([.-]?\w+)*(.\w{2,3})+$/)
    .min(10)
    .max(63)
    .email()
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
        .get()
    ),
  contactPhone: Joi.string()
    .trim()
    .pattern(/^\+380\d{9}$/)
    .messages(
      new FieldErrors("number")
        .string()
        .pattern("starts with +380", "9 numbers after country code")
        .get()
    ),
}).messages(new FieldErrors("service").object().extraFields().get());

module.exports = { updateServiceSchema };
