const { VacancyModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const updateCategotyById = async (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;

  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) {
    throw new NotFoundError();
  }

  const updatedVacancy = await VacancyModel.findByIdAndUpdate(
    id,
    { category },
    { returnDocument: "after", runValidators: true }
  );

  res.status(200).json(updatedVacancy);
};

module.exports = {
  updateCategotyById,
};
