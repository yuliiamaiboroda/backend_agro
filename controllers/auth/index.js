const { changeRoleOfUserById } = require("./change-role");
const { deleteUserById } = require("./delete-user-by-Id");
const { getAllUser } = require("./get-all-user");
const { login } = require("./login");
const { logout } = require("./logout");
const { refreshUser } = require("./refresh-user");
const { register } = require("./register");

module.exports = {
  register,
  login,
  logout,
  getAllUser,
  deleteUserById,
  changeRoleOfUserById,
  refreshUser,
};
