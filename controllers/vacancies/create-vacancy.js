const { VacancyModel } = require("../../models");
const { AccessDeniedError } = require("../../helpers/utils");

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
    throw new AccessDeniedError();
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
