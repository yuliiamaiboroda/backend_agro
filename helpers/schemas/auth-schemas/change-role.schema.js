const Joi = require("joi");

const userChangeRoleSchema = Joi.object({
  role: Joi.string()
    .trim()
    .valid("admin", "applyManager", "servicesManager", "productsManager")
    .required(),
});

module.exports = {
  userChangeRoleSchema,
};
