const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { EmailUsedError } = require("../../helpers/utils");
const {
  createAccessToken,
  createRefreshToken,
} = require("../../services/auth");
const crypto = require("crypto");

const register = async (req, res, next) => {
  const { email, password, name, surname, role } = req.body;

  const userWithEmail = await UserModel.findOne({ email });
  if (userWithEmail) {
    throw new EmailUsedError();
  }
  const sessionKey = crypto.randomUUID();

  const passwordHash = await bcrypt.hash(password, 10);
  const userInstance = await UserModel.create({
    email,
    passwordHash,
    name,
    surname,
    role,
    sessionKey,
  });

  const accessToken = createAccessToken({
    userId: userInstance._id.toString(),
    sessionKey,
  });
  const refreshToken = createRefreshToken({
    userId: userInstance._id.toString(),
  });

  res.status(201).json({
    accessToken,
    refreshToken,
    user: {
      email: userInstance.email,
      name: userInstance.name,
      surname: userInstance.surname,
      role: userInstance.role,
    },
  });
};

module.exports = {
  register,
};
