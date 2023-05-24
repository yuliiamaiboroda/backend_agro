const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { EmailUsedError } = require("../../helpers/utils");
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

  res.status(201).json({
    email: userInstance.email,
    name: userInstance.name,
    surname: userInstance.surname,
    role: userInstance.role,
    _id: userInstance._id,
  });
};

module.exports = {
  register,
};
