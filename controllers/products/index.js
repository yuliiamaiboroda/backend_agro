const { getAll } = require("./get-all");
const { getCertainById } = require("./get-certain-by-id");
const { create } = require("./create");
const { updateById } = require("./update-by-id");
const { removeById } = require("./remove-by-id");

module.exports = {
  getAll,
  getCertainById,
  create,
  updateById,
  removeById,
};
