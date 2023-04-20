const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const createProductSchema = Joi.object({
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
}).messages(new FieldErrors("product").object().extraFields().get());

module.exports = { createProductSchema };
