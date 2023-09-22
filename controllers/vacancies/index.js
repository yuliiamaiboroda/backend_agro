const vacanciesServices = require("../../services/vacancies");

const getAllVacancies = async (req, res) => {
  const vacancies = await vacanciesServices.getAllVacancies();

  res.status(200).json(vacancies);
};

const createVacancy = async (req, res) => {
  const vacancy = await vacanciesServices.createVacancy(req.body);

  res.status(201).json(vacancy);
};

const getVacancyById = async (req, res) => {
  const vacancy = await vacanciesServices.getVacancyById(req.params.id);

  res.status(200).json(vacancy);
};

const getVacanciesByCategory = async (req, res) => {
  const vacancies = await vacanciesServices.getVacanciesByCategory(
    req.params.categoryName
  );

  res.status(200).json(vacancies);
};

const getVacanciesTitles = async (req, res) => {
  const titles = await vacanciesServices.getVacanciesTitles();

  res.status(200).json(titles);
};

const removeVacancyById = async (req, res) => {
  const message = await vacanciesServices.removeVacancyById(req.params.id);

  res.status(204).send(message);
};

const updateVacancyById = async (req, res) => {
  const vacancy = await vacanciesServices.updateVacancyById(
    req.params.id,
    req.body
  );

  res.status(200).json(vacancy);
};

module.exports = {
  createVacancy,
  getAllVacancies,
  removeVacancyById,
  updateVacancyById,
  getVacancyById,
  getVacanciesByCategory,
  getVacanciesTitles,
};
