const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { createHttpException } = require("../../helpers");
const { createAccessToken } = require("../../services/auth");
const crypto = require("crypto");

const login = async (req, res, next) => {
  const unauthorizedMessage = "Invalid email or password";

  const { email, password } = req.body;

  const userInstanseOrNull = await UserModel.findOne({
    email,
  });

  if (userInstanseOrNull === null) {
    throw createHttpException(401, unauthorizedMessage);
  }

  const isValidPassword = await bcrypt.compare(
    password,
    userInstanseOrNull.passwordHash
  );

  if (!isValidPassword) {
    throw createHttpException(401, unauthorizedMessage);
  }

  const sessionKey = crypto.randomUUID();

  await UserModel.findOneAndUpdate(
    { email },
    { sessionKey },
    { runValidators: true }
  );

  const accessToken = createAccessToken({
    userId: userInstanseOrNull._id.toString(),
    sessionKey,
  });

  res.status(200).json({
    token: accessToken,
    user: {
      email: userInstanseOrNull.email,
      name: userInstanseOrNull.name,
      surname: userInstanseOrNull.surname,
      role: userInstanseOrNull.role,
    },
  });
};

module.exports = {
  login,
};
