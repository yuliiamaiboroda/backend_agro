const { VacancyModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const removeById = async (req, res, next) => {
  const { id } = req.params;

  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) {
    throw new NotFoundError();
  }

  await VacancyModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  removeById,
};
