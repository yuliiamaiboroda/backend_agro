const Joi = require("joi");
const { FieldErrors } = require("../../utils");
const { CATEGORY_LIST } = require("../../constants");

const createVacancySchema = Joi.object({
  category: Joi.string()
    .trim()
    .valid(CATEGORY_LIST.actual, CATEGORY_LIST.irrelevant)
    .required()
    .messages(
      new FieldErrors("category")
        .string()
        .valid(CATEGORY_LIST.actual, CATEGORY_LIST.irrelevant)
        .required()
        .get()
    ),
  title: Joi.string()
    .trim()
    .pattern(/^(?![-' ]+$)[a-zA-Zа-яА-ЯіІїЇєЄ0-9-'‘ʼ,./ ]+$/)
    .min(5)
    .max(30)
    .required()
    .messages(
      new FieldErrors("title")
        .string()
        .pattern("letters, numbers, hyphens and apostrophes")
        .min(5)
        .max(30)
        .required()
        .get()
    ),
  description: Joi.string()
    .trim()
    .min(10)
    .max(120)
    .required()
    .messages(
      new FieldErrors("description").string().min(10).max(120).required().get()
    ),
  sallary: Joi.string()
    .trim()
    .min(4)
    .max(15)
    .pattern(/^\d+(-\d+)*$/)
    .required()
    .messages(
      new FieldErrors("sallary")
        .string()
        .min(4)
        .max(15)
        .pattern("numbers", "- between numbers", "no spaces")
        .required()
        .get()
    ),
  education: Joi.string()
    .trim()
    .max(60)
    .required()
    .messages(new FieldErrors("education").string().max(60).required().get()),
  contactMail: Joi.string()
    .trim()
    .pattern(/^(\w+([.-]?\w+){1,})*@\w+([.-]?\w+)*(.\w{2,3})+$/)
    .min(10)
    .max(63)
    .email()
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
  contactPhone: Joi.string()
    .trim()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages(
      new FieldErrors("phone")
        .string()
        .pattern("starts with +380", "9 numbers after country code")
        .required()
        .get()
    ),
  workExperienceRequired: Joi.string()
    .trim()
    .pattern(/^\d+(-\d+)*$/)
    .messages(
      new FieldErrors("work expirience")
        .string()
        .pattern("numbers", "- between numbers", "no spaces")
        .get()
    ),
  location: Joi.string()
    .trim()
    .pattern(/^([a-zA-Z-А-Яа-яЁёЇїІіЄєҐґ',]+)*$/)
    .min(3)
    .max(60)
    .required()
    .messages(
      new FieldErrors("location")
        .string()
        .min(3)
        .max(60)
        .pattern("no spaces", "letters")
        .get()
    ),
}).messages(new FieldErrors("vacancy").object().extraFields().get());

module.exports = {
  createVacancySchema,
};
