const { updateVacancyById } = require("./update-by-id");
const { create } = require("./create");
const { removeById } = require("./remove-by-id");
const { getActual } = require("./get-actual");
const { getAll } = require("./get-all");
const { getCertainById } = require("./get-certain-by-id");
const { getIrrelevant } = require("./get-irrelevant");

module.exports = {
  create,
  getAll,
  removeById,
  updateVacancyById,
  getActual,
  getCertainById,
  getIrrelevant,
};
