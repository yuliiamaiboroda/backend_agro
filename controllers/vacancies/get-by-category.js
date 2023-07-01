const { NOTICE_CATEGORIES, CATEGORY_LIST } = require("../../helpers/constants");
const { NotFoundError } = require("../../helpers/utils");
const { VacancyModel } = require("../../models");

const getByCategory = async (req, res, next) => {
  const { categoryName } = req.params;

  if (!NOTICE_CATEGORIES.includes(categoryName)) {
    throw new NotFoundError();
  }

  if (categoryName === CATEGORY_LIST.all) {
    const allVacancies = await VacancyModel.find();
    res.status(200).json(allVacancies);
  } else {
    const vacanciesList = await VacancyModel.find({ category: categoryName });
    res.status(200).json(vacanciesList);
  }
};

module.exports = {
  getByCategory,
};
