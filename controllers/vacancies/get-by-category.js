const { NOTICE_CATEGORIES } = require("../../helpers/constants");
const { NotFoundError } = require("../../helpers/utils");
const { VacancyModel } = require("../../models");

const getByCategory = async (req, res, next) => {
  const { categoryName } = req.params;

  if (categoryName === "all-vacancies") {
    const allVacancies = await VacancyModel.find();
    res.status(200).json(allVacancies);
  }

  if (!NOTICE_CATEGORIES.includes(categoryName)) {
    throw new NotFoundError();
  }

  const vacanciesList = await VacancyModel.find({ category: categoryName });

  res.status(200).json(vacanciesList);
};

module.exports = {
  getByCategory,
};
