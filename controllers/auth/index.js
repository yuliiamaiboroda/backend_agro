const { updateById } = require("./update-by-id");
const { current } = require("./current");
const { getAll } = require("./get-all");
const { login } = require("./login");
const { logout } = require("./logout");
const { refreshUser } = require("./refresh-user");
const { register } = require("./register");
const { removeById } = require("./remove-by-id");

module.exports = {
  register,
  login,
  logout,
  getAll,
  removeById,
  updateById,
  refreshUser,
  current,
};
