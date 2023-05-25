const { updateById } = require("./update-by-id");
const { create } = require("./create");
const { removeById } = require("./remove-by-id");

const { getAll } = require("./get-all");
const { getCertainById } = require("./get-certain-by-id");

const { getByCategory } = require("./get-by-category");
const { getTitles } = require("./get-titles");

module.exports = {
  create,
  getAll,
  removeById,
  updateById,
  getCertainById,
  getByCategory,
  getTitles,
};
