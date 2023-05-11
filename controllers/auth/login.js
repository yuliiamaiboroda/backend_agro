const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { UnauthorizedError } = require("../../helpers/utils");
const {
  createAccessToken,
  createRefreshToken,
} = require("../../services/auth");
const crypto = require("crypto");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const userInstanseOrNull = await UserModel.findOne({
    email,
  });

  if (userInstanseOrNull === null) {
    throw new UnauthorizedError();
  }

  const isValidPassword = await bcrypt.compare(
    password,
    userInstanseOrNull.passwordHash
  );

  if (!isValidPassword) {
    throw new UnauthorizedError();
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
  const refreshToken = createRefreshToken({
    userId: userInstanseOrNull._id.toString(),
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    accessToken,
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
