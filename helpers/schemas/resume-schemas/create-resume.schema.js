const Joi = require("joi");
const { FieldErrors } = require("../../utils");
const { FORBIDDEN_DOMAINS } = require("../../constants");

const createResumeSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[a-zA-Zа-яА-ЯіІїЇєЄ ]*$/)
    .min(2)
    .max(62)
    .messages(
      new FieldErrors("name")
        .string()
        .min(2)
        .max(62)
        .pattern("letters and spaces")
        .required()
        .get()
    ),
  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages(
      new FieldErrors("phone")
        .string()
        .pattern("+380", "another 9 numbers without brackets and hyphens")
        .required()
        .get()
    ),
  email: Joi.string()
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
  position: Joi.string()
    .pattern(/^(?![-' ]+$)[a-zA-Zа-яА-ЯіІїЇєЄ0-9-'‘ʼ.,/ ]+$/)
    .min(2)
    .max(62)
    .required()
    .messages(
      new FieldErrors("position")
        .string()
        .pattern("letters", "numbers", "hyphens and apostrophes")
        .min(2)
        .max(62)
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
}).messages(new FieldErrors("resume").object().extraFields().get());

module.exports = {
  createResumeSchema,
};
