const { UserModel } = require('../../models');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
  EmailUsedError,
  NotFoundError,
  renameIdField,
  UnauthorizedError,
  DeleteTheLastAdminAccountError,
  UpdateOwnPasswordError,
  randomPassword,
  sendEmail,
} = require('../../helpers/utils');
const {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} = require('../../services/auth');
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

const getCurrentUser = async user => {
  const { email, name, surname, role } = user;

  return {
    email,
    name,
    surname,
    role,
  };
};

const login = async body => {
  const { email, password } = body;

  const user = await UserModel.findOne({ email });

  if (!user) throw new UnauthorizedError();

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) throw new UnauthorizedError();

  let sessionKey, refreshKey;

  do {
    sessionKey = crypto.randomUUID();
    refreshKey = crypto.randomUUID();
  } while (sessionKey === refreshKey);

  await UserModel.findOneAndUpdate(
    { email },
    { sessionKey, refreshKey },
    UPDATE_DEFAULT_CONFIG
  );

  const accessToken = createAccessToken({
    userId: user._id.toString(),
    sessionKey,
  });
  const refreshToken = createRefreshToken({
    userId: user._id.toString(),
    refreshKey,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: user.role,
    },
  };
};

const logout = async id => {
  await UserModel.findByIdAndUpdate(
    id,
    {
      sessionKey: null,
      refreshKey: null,
    },
    UPDATE_DEFAULT_CONFIG
  );
};

const refreshUser = async request => {
  try {
    const { cookies } = request;

    if (!cookies) throw new UnauthorizedError();

    const { jwt } = cookies;

    if (!jwt) throw new UnauthorizedError();

    const token = request.cookies.jwt;

    if (!token) throw new UnauthorizedError();

    try {
      const { userId, refreshKey } = verifyRefreshToken(token);
      const userInstanse = await UserModel.findById(userId);

      if (!userInstanse || !userInstanse.refreshKey)
        throw new UnauthorizedError();

      if (refreshKey !== userInstanse.refreshKey) throw new UnauthorizedError();

      let sessionKey, updatedRefreshKey;

      do {
        sessionKey = crypto.randomUUID();
        updatedRefreshKey = crypto.randomUUID();
      } while (sessionKey === updatedRefreshKey);

      await UserModel.findByIdAndUpdate(
        userInstanse._id,
        {
          sessionKey,
          refreshKey: updatedRefreshKey,
        },
        UPDATE_DEFAULT_CONFIG
      );

      const accessToken = createAccessToken({
        userId: userInstanse._id.toString(),
        sessionKey,
      });

      const refreshToken = createRefreshToken({
        userId: userInstanse._id.toString(),
        refreshKey: updatedRefreshKey,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedError();
    }
  } catch (error) {
    throw new Error(error);
  }
};

const restorePassword = async email => {
  if (!email) throw new NotFoundError();

  const user = await UserModel.findOne({ email });

  if (!user) throw new NotFoundError();

  const newPassword = randomPassword();
  const passwordHash = await bcrypt.hash(newPassword, 10);

  try {
    sendEmail(
      email,
      'Тимчасовий пароль',
      `Це ваш тимчасовий пароль: ${newPassword}. Будь ласка, змініть його при наступному вході в аккаунт`
    );
    await UserModel.findOneAndUpdate(
      { email },
      { passwordHash },
      UPDATE_DEFAULT_CONFIG
    );
  } catch (error) {
    throw new Error(error);
  }
};

const updateOwnPassword = async (id, body) => {
  const { oldPassword, newPassword } = body;

  const user = await UserModel.findById(id);

  if (!user) throw new UnauthorizedError();

  const isValidPassword = await bcrypt.compare(oldPassword, user.passwordHash);

  if (!isValidPassword) throw new UpdateOwnPasswordError();

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await UserModel.findByIdAndUpdate(
    id,
    { passwordHash },
    UPDATE_DEFAULT_CONFIG
  );
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
  getCurrentUser,
  login,
  logout,
  refreshUser,
  restorePassword,
  updateOwnPassword,
};
