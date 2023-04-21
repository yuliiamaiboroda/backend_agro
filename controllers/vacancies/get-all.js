const { VacancyModel } = require("../../models");

const getAll = async (req, res, next) => {
  const listAllVacancies = await VacancyModel.find();

  res.status(200).json(listAllVacancies);
};

module.exports = {
  getAll,
};
