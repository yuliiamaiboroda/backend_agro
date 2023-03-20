const { VacancyModel } = require("../../models");
const { createHttpException } = require("../../helpers");

const deleteVacancyById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin" && role !== "applyManager") {
    throw createHttpException(403, "do not have access rights to the content");
  }

  await VacancyModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  deleteVacancyById,
};
