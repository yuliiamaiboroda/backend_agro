const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const createResumeSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(62)
    .required()
    .messages(new FieldErrors("name").string().min(2).max(62).required().get()),
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
    .pattern(/^(\w+([.-]?\w+){1,})*@\w+([.-]?\w+)*(.\w{2,3})+$/)
    .required()
    .messages(
      new FieldErrors("email")
        .string()
        .pattern(
          "latin letters",
          "numbers and signs",
          "at the beginning or end of the email there can be no hyphen, there must be at least 2 characters before the (@)"
        )
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
        .pattern("latin letters", "numbers", "hyphens and apostrophes")
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
  agreement: Joi.string()
    .valid("true")
    .required()
    .messages(
      new FieldErrors("agreement").string().valid("true").required().get()
    ),
}).messages(new FieldErrors("resume").object().extraFields().get());

module.exports = {
  createResumeSchema,
};
