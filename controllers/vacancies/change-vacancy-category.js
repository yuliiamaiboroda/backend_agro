const { VacancyModel } = require("../../models");

const changeVacancyCategoty = async (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;

  await VacancyModel.findByIdAndUpdate(id, { category });

  res.status(200).send();
};

module.exports = {
  changeVacancyCategoty,
};
