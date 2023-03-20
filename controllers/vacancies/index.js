const { changeVacancyCategoty } = require("./change-vacancy-category");
const { createVacancy } = require("./create-vacancy");
const { deleteVacancyById } = require("./delete-vacancy-dy-id");
const { getAllVacancies } = require("./get-all-vacancy");

module.exports = {
  createVacancy,
  getAllVacancies,
  deleteVacancyById,
  changeVacancyCategoty,
};
