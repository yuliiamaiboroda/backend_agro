const { UserModel } = require('../../models');
const bcrypt = require('bcrypt');
const {
  NotFoundError,
  UnauthorizedError,
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
const { UPDATE_DEFAULT_CONFIG } = require('../../helpers/constants');

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
  getCurrentUser,
  login,
  logout,
  refreshUser,
  restorePassword,
  updateOwnPassword,
};
