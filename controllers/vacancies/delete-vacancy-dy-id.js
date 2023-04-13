const { VacancyModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const deleteVacancyById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin" && role !== "applyManager") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  await VacancyModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  deleteVacancyById,
};
