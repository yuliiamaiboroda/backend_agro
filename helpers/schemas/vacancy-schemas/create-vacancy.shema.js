const Joi = require("joi");

const createVacancySchema = Joi.object({
  category: Joi.string()
    .trim()
    .valid("all-vacancies", "actual-vacancies")
    .required(),
  title: Joi.string().trim().min(5).max(30).required(),
  description: Joi.string().trim().min(10).max(120).required(),
  sallary: Joi.string()
    .trim()
    // .pattern(/^([1-9][0-9])*$/)
    .min(4)
    .max(6)
    .required(),
  education: Joi.string()
    .trim()
    // .pattern(/^([a-zA-Z-А-Яа-яЁёЇїІіЄєҐґ',]+)*$/)
    .min(0)
    .max(60),
  contactMail: Joi.string()
    .trim()
    .pattern(/^(\w+([.-]?\w+){1,})*@\w+([.-]?\w+)*(.\w{2,3})+$/)
    .min(10)
    .max(63)
    .email()
    .required(),
  contactPhone: Joi.string()
    .trim()
    .pattern(/^\+380\d{9}$/)
    .required(),
  workExperienceRequired: Joi.string()
    .trim()
    .pattern(/^[0-9]+$/)
    .min(0)
    .max(2),
  location: Joi.string()
    .trim()
    .pattern(/^([a-zA-Z-А-Яа-яЁёЇїІіЄєҐґ',]+)*$/)
    .min(3)
    .max(60)
    .required(),
});

module.exports = {
  createVacancySchema,
};
