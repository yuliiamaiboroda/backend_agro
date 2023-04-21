const { getAll } = require("./get-all");
const { create } = require("./create");
const { getCertainById } = require("./get-certain-by-id");
const { removeById } = require("./remove-by-id");
const { updateById } = require("./update-by-id");

module.exports = {
  getAll,
  create,
  getCertainById,
  removeById,
  updateById,
};