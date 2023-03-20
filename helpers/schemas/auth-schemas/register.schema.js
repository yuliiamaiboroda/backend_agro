const Joi = require("joi");

const userRegisterSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^([a-zA-Z-А-Яа-яЁёЇїІіЄєҐґ']+)$/)
    .min(2)
    .max(30)
    .required(),
  surname: Joi.string()
    .trim()
    .pattern(/^([a-zA-Z-А-Яа-яЁёЇїІіЄєҐґ']+)$/)
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .trim()
    .pattern(/^(\w+([.-]?\w+){1,})*@\w+([.-]?\w+)*(.\w{2,3})+$/)
    .min(10)
    .max(63)
    .email()
    .required(),
  password: Joi.string()
    .trim()
    .pattern(/^\d*(?=.*[a-z])(?=.*[A-Z])\S+\D*\d*$/)
    .min(7)
    .max(32)
    .required(),
  role: Joi.string()
    .trim()
    .valid("admin", "applyManager", "servicesManager", "productsManager")
    .required(),
});

module.exports = {
  userRegisterSchema,
};
