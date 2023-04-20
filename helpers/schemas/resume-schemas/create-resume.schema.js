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
    .email()
    .required()
    .messages(new FieldErrors("email").string().email().required().get()),
  position: Joi.string()
    .min(2)
    .max(62)
    .required()
    .messages(
      new FieldErrors("position").string().min(2).max(62).required().get()
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
}).messages(new FieldErrors("resume").object().get());

module.exports = {
  createResumeSchema,
};
