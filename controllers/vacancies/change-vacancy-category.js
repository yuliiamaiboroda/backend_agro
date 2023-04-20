const { VacancyModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const changeVacancyCategoty = async (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;

  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) {
    throw new NotFoundError();
  }

  await VacancyModel.findByIdAndUpdate(id, { category });

  res.status(200).send();
};

module.exports = {
  changeVacancyCategoty,
};
