const { updateCategoty } = require("./update-category");
const { create } = require("./create");
const { removeById } = require("./remove-by-id");
const { getActual } = require("./get-actual");
const { getAll } = require("./get-all");
const { getCertain } = require("./get-certain");

module.exports = {
  create,
  getAll,
  removeById,
  updateCategoty,
  getActual,
  getCertain,
};
