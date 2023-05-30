const { create } = require("./create");
const { updateViews } = require("./update-views");
const { getAll } = require("./get-all");
const { getCertainById } = require("./get-certain-by-id");
const { removeById } = require("./remove-by-id");
const { updateIsFavorite } = require("./update-is-favorite");

module.exports = {
  create,
  updateViews,
  getAll,
  getCertainById,
  removeById,
  updateIsFavorite,
};
