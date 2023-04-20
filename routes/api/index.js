const authRouter = require("./users");
const vacanciesRouter = require("./vacancies");
const productsRouter = require("./products");
const servicesRouter = require("./services");
const feedbackRouter = require("./feedback");
const resumeRouter = require("./resume");

module.exports = {
  authRouter,
  vacanciesRouter,
  productsRouter,
  feedbackRouter,
  servicesRouter,
  resumeRouter,
};
