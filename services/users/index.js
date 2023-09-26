const { UserModel } = require('../../models');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
  EmailUsedError,
  NotFoundError,
  renameIdField,
  DeleteTheLastAdminAccountError,
} = require('../../helpers/utils');
const crypto = require('crypto');
const {
  UPDATE_DEFAULT_CONFIG,
  ROLES_LIST,
} = require('../../helpers/constants');

const createUser = async body => {
  const { email, password, name, surname, role } = body;

  const userWithEmail = await UserModel.findOne({ email });

  if (userWithEmail) throw new EmailUsedError();

  const sessionKey = crypto.randomUUID();

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email,
    passwordHash,
    name,
    surname,
    role,
    sessionKey,
  });

  return {
    email: user.email,
    name: user.name,
    surname: user.surname,
    role: user.role,
    id: user._id,
  };
};

const getAllUsers = async id => {
  const users = await UserModel.find(
    {
      _id: { $ne: new mongoose.Types.ObjectId(id) },
    },
    { email: 1, name: 1, surname: 1, role: 1, _id: 1 }
  );

  return users.map(user => renameIdField(user));
};

const getUserById = async id => {
  const user = await UserModel.findById(id, {
    email: 1,
    name: 1,
    surname: 1,
    role: 1,
    createdAt: 1,
    _id: 1,
  });

  if (!user) throw new NotFoundError();

  return renameIdField(user);
};

const removeUserById = async id => {
  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError();

  const listOfAdmins = await UserModel.find({ role: ROLES_LIST.admin });

  if (listOfAdmins.length <= 1) throw new DeleteTheLastAdminAccountError();

  await UserModel.findByIdAndRemove(id);
};

const updateUserById = async (id, body) => {
  const { email, name, surname, role, password } = body;

  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError();

  let passwordHash;

  if (password) passwordHash = await bcrypt.hash(password, 10);

  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    {
      email,
      name,
      surname,
      role,
      passwordHash: password ? passwordHash : user.passwordHash,
    },
    {
      ...UPDATE_DEFAULT_CONFIG,
      projection: { email: 1, name: 1, surname: 1, role: 1, _id: 1 },
    }
  );

  return renameIdField(updatedUser);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
};
