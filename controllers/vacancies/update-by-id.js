const { VacancyModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const updateVacancyById = async (req, res, next) => {
  const { id } = req.params;
  const {
    category,
    title,
    description,
    sallary,
    education,
    contactMail,
    contactPhone,
    workExperienceRequired,
    location,
  } = req.body;

  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) {
    throw new NotFoundError();
  }

  const updatedVacancy = await VacancyModel.findByIdAndUpdate(
    id,
    {
      category,
      title,
      description,
      sallary,
      education,
      contactMail,
      contactPhone,
      workExperienceRequired,
      location,
    },
    { returnDocument: "after", runValidators: true }
  );

  res.status(200).json(updatedVacancy);
};

module.exports = {
  updateVacancyById,
};
