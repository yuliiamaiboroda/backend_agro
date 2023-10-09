const usersRouter = require('./users');
const vacanciesRouter = require('./vacancies');
const productsRouter = require('./products');
const servicesRouter = require('./services');
const feedbackRouter = require('./feedback');
const resumesRouter = require('./resumes');
const authenticationRouter = require('./authentication');

module.exports = {
  usersRouter,
  vacanciesRouter,
  productsRouter,
  feedbackRouter,
  servicesRouter,
  resumesRouter,
  authenticationRouter,
};
