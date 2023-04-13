const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");
const { createAccessToken } = require("../../services/auth");

const register = async (req, res, next) => {
  const { email, password, name, surname, role } = req.body;

  const userWithEmail = await UserModel.findOne({ email });
  if (userWithEmail) {
    throw createHttpException(RESPONSE_ERRORS.emailUsed);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userInstance = await UserModel.create({
    email,
    passwordHash,
    name,
    surname,
    role,
  });

  const accessToken = createAccessToken({
    userId: userInstance._id.toString(),
  });

  res.status(201).json({
    token: accessToken,
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
