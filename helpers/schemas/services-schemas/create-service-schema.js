const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const createServiceSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(32)
    .required()
    .messages(
      new FieldErrors("title").string().min(2).max(32).required().get()
    ),
  description: Joi.string()
    .min(2)
    .max(2000)
    .required()
    .messages(
      new FieldErrors("description").string().min(2).max(2000).required().get()
    ),
  price: Joi.number()
    .required()
    .messages(
      new FieldErrors("price")
        .number()
        .required()
        .get()
    ),
  contactMail: Joi.string()
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
  contactPhone: Joi.string()
    .trim()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages(
      new FieldErrors("number")
        .string()
        .pattern("starts with +380", "9 numbers after country code")
        .required()
        .get()
    ),
}).messages(new FieldErrors("service").object().extraFields().get());

module.exports = { createServiceSchema };
