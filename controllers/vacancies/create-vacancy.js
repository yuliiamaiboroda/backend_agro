const { VacancyModel } = require("../../models");

const createVacancy = async (req, res, next) => {
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
