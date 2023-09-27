const { FeedbackModel } = require('./feedback-model');
const { ProductsModel } = require('./products-model');
const { ServicesModel } = require('./services-model');
const { UserModel } = require('./user-model');
const { VacancyModel } = require('./vacancies-model');
const { ResumeModel } = require('./resume-model');

module.exports = {
  UserModel,
  VacancyModel,
  ProductsModel,
  ServicesModel,
  FeedbackModel,
  ResumeModel,
};
