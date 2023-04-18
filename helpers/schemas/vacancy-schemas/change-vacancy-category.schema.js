const Joi = require("joi");

const changeVacancyCategotySchema = Joi.object({
  category: Joi.string()
    .trim()
    .valid("all-vacancies", "actual-vacancies")
    .required(),
});

module.exports = {
  changeVacancyCategotySchema,
};
