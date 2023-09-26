const usersServices = require('../../services/users');

const getAllUsers = async (req, res) => {
  const users = await usersServices.getAllUsers(req.user.id);

  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const user = await usersServices.createUser(req.body);

  res.status(201).json(user);
};

const getUserById = async (req, res) => {
  const user = await usersServices.getUserById(req.params.id);

  res.status(200).json(user);
};

const removeUserById = async (req, res) => {
  await usersServices.removeUserById(req.params.id);

  res.status(204).send();
};

const updateUserById = async (req, res) => {
  const user = await usersServices.updateUserById(req.params.id, req.body);

  res.status(200).json(user);
};

module.exports = {
  createUser,
  getAllUsers,
  removeUserById,
  updateUserById,
  getUserById,
};
