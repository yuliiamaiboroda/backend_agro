const { VacancyModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const changeVacancyCategoty = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;
  const { category } = req.body;
  if (role !== "admin" && role !== "applyManager") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }
  await VacancyModel.findByIdAndUpdate(id, { category });

  res.status(200).send();
};

module.exports = {
  changeVacancyCategoty,
};
