const { VacancyModel } = require("../../models");
const { NOTICE_CATEGORIES, CATEGORY_LIST } = require("../../helpers/constants");
const { NotFoundError } = require("../../helpers/utils");

const createVacancy = async (body) => {
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
  } = body;

  const newVacancy = await VacancyModel.create({
    category,
    title,
    description,
    sallary,
    education,
    contactMail,
    contactPhone,
    workExperienceRequired,
    location,
  });

  return {
    id: newVacancy._id,
    category: newVacancy.category,
    title: newVacancy.title,
    description: newVacancy.description,
    sallary: newVacancy.sallary,
    education: newVacancy.education,
    contactMail: newVacancy.contactMail,
    contactPhone: newVacancy.contactPhone,
    workExperienceRequired: newVacancy.workExperienceRequired,
    location: newVacancy.location,
  };
};

const getAllVacancies = async () => {
  return await VacancyModel.find();
};

const getVacancyById = async (id) => {
  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) throw new NotFoundError();

  return vacancy;
};

const getVacanciesByCategory = async (category) => {
  if (!NOTICE_CATEGORIES.includes(category)) throw new NotFoundError();

  return category === CATEGORY_LIST.all
    ? await VacancyModel.find()
    : await VacancyModel.find({ category });
};

const getVacanciesTitles = async () => {
  return await VacancyModel.find({}, { title: 1 });
};

const removeVacancyById = async (id) => {
  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) throw new NotFoundError();

  await VacancyModel.findByIdAndRemove(id);

  return { message: "Vacancy deleted" };
};

const updateVacancyById = async (id, body) => {
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
  } = body;

  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) throw new NotFoundError();

  const updatedVacancy = await VacancyModel.findByIdAndUpdate(id, {
    category,
    title,
    description,
    sallary,
    education,
    contactMail,
    contactPhone,
    workExperienceRequired,
    location,
  });

  return {
    id: updatedVacancy._id,
    category: updatedVacancy.category,
    title: updatedVacancy.title,
    description: updatedVacancy.description,
    sallary: updatedVacancy.sallary,
    education: updatedVacancy.education,
    contactMail: updatedVacancy.contactMail,
    contactPhone: updatedVacancy.contactPhone,
    workExperienceRequired: updatedVacancy.workExperienceRequired,
    location: updatedVacancy.location,
  };
};

module.exports = {
  createVacancy,
  getAllVacancies,
  getVacancyById,
  getVacanciesByCategory,
  getVacanciesTitles,
  removeVacancyById,
  updateVacancyById,
};
