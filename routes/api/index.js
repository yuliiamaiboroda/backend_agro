const authRouter = require("./users");
const vacanciesRouter = require("./vacancies");
const productsRouter = require("./products");
const servicesRouter = require("./services");
const feedbackRouter = require("./feedback");
const resumesRouter = require("./resumes");

module.exports = {
  authRouter,
  vacanciesRouter,
  productsRouter,
  feedbackRouter,
  servicesRouter,
  resumesRouter,
};
