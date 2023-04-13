const { VacancyModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const createVacancy = async (req, res, next) => {
  const { role } = req.user;
  const {
    category,
    title,
    description,
    sallary,
    education,
    contactMail,
    contactPhone,
    workExperienceRequired,
    location,
  } = req.body;

  if (role !== "admin" && role !== "applyManager") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  const result = await VacancyModel.create({
    category,
    title,
    description,
    sallary,
    education,
    contactMail,
    contactPhone,
    workExperienceRequired,
    location,
  });

  res.status(201).json(result);
};

module.exports = {
  createVacancy,
};
