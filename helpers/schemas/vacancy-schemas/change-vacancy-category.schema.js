const Joi = require("joi");
const { FieldErrors } = require("../../utils");
const { NOTICE_CATEGORIES } = require("../../constants");

const changeVacancyCategotySchema = Joi.object({
  category: Joi.string()
    .trim()
    .valid(...NOTICE_CATEGORIES)
    .required()
    .messages(
      new FieldErrors("category")
        .string()
        .valid(...NOTICE_CATEGORIES)
        .required()
        .get()
    ),
});

module.exports = {
  changeVacancyCategotySchema,
};
