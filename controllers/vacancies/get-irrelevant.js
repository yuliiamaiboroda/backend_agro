const { CATEGORY_LIST } = require("../../helpers/constants");
const { VacancyModel } = require("../../models");

const getIrrelevant = async (req, res, next) => {
  const listIrrelevantVacanies = await VacancyModel.find({
    category: CATEGORY_LIST.all,
  });

  res.status(200).json(listIrrelevantVacanies);
};

module.exports = {
  getIrrelevant,
};
