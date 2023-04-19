const { changeVacancyCategoty } = require("./change-vacancy-category");
const { createVacancy } = require("./create-vacancy");
const { deleteVacancyById } = require("./delete-vacancy-dy-id");
const { getActualVacancies } = require("./get-actual-vacancy");
const { getAllVacancies } = require("./get-all-vacancy");
const { getCertain } = require("./get-certain");

module.exports = {
  createVacancy,
  getAllVacancies,
  deleteVacancyById,
  changeVacancyCategoty,
  getActualVacancies,
  getCertain,
};
