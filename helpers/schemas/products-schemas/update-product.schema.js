const Joi = require("joi");
const { FieldErrors } = require("../../utils");

const updateProductSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(32)
    .messages(new FieldErrors("title").string().min(2).max(32).get()),
  description: Joi.string()
    .min(2)
    .max(2000)

    .messages(new FieldErrors("description").string().min(2).max(2000).get()),
})
  .min(1)
  .messages(new FieldErrors("product").object().min(1).extraFields().get());

module.exports = { updateProductSchema };
