const { VacancyModel } = require('../../models');
const { NOTICE_CATEGORIES, CATEGORY_LIST } = require('../../helpers/constants');
const { NotFoundError, renameIdField } = require('../../helpers/utils');
const { UPDATE_DEFAULT_CONFIG } = require('../../helpers/constants');

const createVacancy = async body => {
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
  const vacancies = await VacancyModel.find();

  return vacancies.map(vacancy => renameIdField(vacancy));
};

const getVacancyById = async id => {
  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) throw new NotFoundError();

  return renameIdField(vacancy);
};

const getVacanciesByCategory = async category => {
  if (!NOTICE_CATEGORIES.includes(category)) throw new NotFoundError();

  let vacancies;

  category === CATEGORY_LIST.all
    ? (vacancies = await VacancyModel.find())
    : (vacancies = await VacancyModel.find({ category }));

  return vacancies.map(vacancy => renameIdField(vacancy));
};

const getVacanciesTitles = async () => {
  const titles = await VacancyModel.find({}, { title: 1 });

  return titles.map(title => renameIdField(title));
};

const removeVacancyById = async id => {
  const vacancy = await VacancyModel.findById(id);

  if (!vacancy) throw new NotFoundError();

  await VacancyModel.findByIdAndRemove(id);

  return { message: 'Vacancy deleted' };
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
    UPDATE_DEFAULT_CONFIG
  );

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
