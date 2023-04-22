const { VacancyModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const updateCategotyById = async (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;

  const vacancy = await VacancyModel.findById(id);
  const { category: oldCategory } = vacancy;

  if (!vacancy) {
    throw new NotFoundError();
  }

  await VacancyModel.findByIdAndUpdate(id, { category });

  const {
    category: updatedCategory,
    title,
    description,
    sallary,
    education,
    contactMail,
    contactPhone,
    workExperienceRequired,
    location,
  } = await VacancyModel.findById(id);

  res.status(200).json({
    oldCategory,
    updatedCategory,
    title,
    description,
    sallary,
    education,
    contactMail,
    contactPhone,
    workExperienceRequired,
    location,
    id,
  });
};

module.exports = {
  updateCategotyById,
};
