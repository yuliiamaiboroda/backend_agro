const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const sendFeedBackSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(30)
    .required()
    .messages(new FieldErrors("name").string().min(4).max(30).required().get()),
  contactPhone: Joi.string()
    .trim()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages(
      new FieldErrors("number")
        .string()
        .pattern(/^\+380\d{9}$/)
        .required()
        .get()
    ),
  contactMail: Joi.string()
    .min(10)
    .max(63)
    .required()
    .messages(
      new FieldErrors("email").string().email().min(10).max(63).required().get()
    ),
  comment: Joi.string()
    .min(2)
    .max(2000)
    .required()
    .messages(
      new FieldErrors("comment").string().min(2).max(2000).required().get()
    ),
  agreement: Joi.boolean().invalid(false).required(),
});

module.exports = { sendFeedBackSchema };
