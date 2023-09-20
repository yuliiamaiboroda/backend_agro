const Joi = require("joi");
const { FieldErrors } = require("../../utils");
const { FORBIDDEN_DOMAINS } = require("../../constants");

const sendFeedBackSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(30)
    .trim()
    .pattern(/^[a-zA-Zа-яА-ЯіІїЇєЄ ]*$/)
    .required()
    .messages(
      new FieldErrors("name")
        .string()
        .min(4)
        .max(30)
        .pattern("letters and spaces")
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
  contactMail: Joi.string()
    .trim()
    .pattern(/^(\w+([.-]?\w+){1,})*@\w+([.-]?\w+)*(.\w{2,3})+$/)
    .min(10)
    .max(63)
    .email()
    .custom((value, helper) => {
      const domain = value.split("@")[1].split(".")[1];

      if (FORBIDDEN_DOMAINS.includes(domain)) {
        return helper.message("Invalid email");
      }

      return true;
    })
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
  comment: Joi.string()
    .min(2)
    .max(2000)
    .required()
    .messages(
      new FieldErrors("comment").string().min(2).max(2000).required().get()
    ),
  agreement: Joi.boolean()
    .valid(true)
    .required()
    .messages(
      new FieldErrors("agreement").boolean().valid("true").required().get()
    ),
}).messages(new FieldErrors("feedback").object().extraFields().get());

module.exports = { sendFeedBackSchema };
