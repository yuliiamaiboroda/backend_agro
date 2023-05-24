const { VacancyModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const getCertainById = async (req, res, next) => {
  const { id } = req.params;

  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) {
    throw new NotFoundError();
  }

  res.status(200).json(vacancy);
};

module.exports = { getCertainById };
