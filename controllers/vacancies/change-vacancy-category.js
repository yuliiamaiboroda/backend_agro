const { VacancyModel } = require("../../models");
const { AccessDeniedError } = require("../../helpers/utils");

const changeVacancyCategoty = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;
  const { category } = req.body;
  if (role !== "admin" && role !== "applyManager") {
    throw new AccessDeniedError();
  }
  await VacancyModel.findByIdAndUpdate(id, { category });

  res.status(200).send();
};

module.exports = {
  changeVacancyCategoty,
};
