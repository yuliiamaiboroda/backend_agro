const { removeById } = require("./remove-by-id");
const { getCertainById } = require("./get-certain-by-id");
const { getAll } = require("./get-all");
const { create } = require("./create");

module.exports = {
  create,
  getAll,
  removeById,
  getCertainById,
};
