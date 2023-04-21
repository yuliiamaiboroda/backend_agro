const { updateCategotyById } = require("./update-category-by-id");
const { create } = require("./create");
const { removeById } = require("./remove-by-id");
const { getActual } = require("./get-actual");
const { getAll } = require("./get-all");
const { getCertainById } = require("./get-certain-by-id");

module.exports = {
  create,
  getAll,
  removeById,
  updateCategotyById,
  getActual,
  getCertainById,
};
