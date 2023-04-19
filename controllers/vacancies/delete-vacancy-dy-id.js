const { VacancyModel } = require("../../models");
const { AccessDeniedError, NotFoundError } = require("../../helpers/utils");

const deleteVacancyById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin" && role !== "applyManager") {
    throw new AccessDeniedError();
  }

  const vacancy = await VacancyModel.findById(id);

  if (!vacancy || !id) {
    throw new NotFoundError();
  }

  await VacancyModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  deleteVacancyById,
};
