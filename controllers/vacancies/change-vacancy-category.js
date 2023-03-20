const { VacancyModel } = require("../../models");
const { createHttpException } = require("../../helpers");

const changeVacancyCategoty = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;
  const { category } = req.body;
  if (role !== "admin" && role !== "applyManager") {
    throw createHttpException(403, "do not have access rights to the content");
  }
  await VacancyModel.findByIdAndUpdate(id, { category });

  res.status(200).send();
};

module.exports = {
  changeVacancyCategoty,
};
