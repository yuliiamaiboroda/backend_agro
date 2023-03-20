const { VacancyModel } = require("../../models");
const { createHttpException } = require("../../helpers");

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
    throw createHttpException(403, "do not have access rights to the content");
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
