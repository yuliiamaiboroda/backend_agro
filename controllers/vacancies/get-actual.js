const { CATEGORY_LIST } = require("../../helpers/constants");
const { VacancyModel } = require("../../models");

const getActual = async (req, res, next) => {
  const listActualVacanies = await VacancyModel.find({
    category: CATEGORY_LIST.actual,
  });

  res.status(200).json(listActualVacanies);
};

module.exports = {
  getActual,
};
