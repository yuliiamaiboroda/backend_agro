const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const { createHttpException } = require("../../helpers");
const { createAccessToken } = require("../../services/auth");

const register = async (req, res, next) => {
  const unauthorizedMessage = "User already exists";

  // const { role: currentRole } = req.user;

  const { email, password, name, surname, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  // if(currentRole==="admin"){

  const userInstance = await UserModel.create({
    email,
    passwordHash,
    name,
    surname,
    role,
  }).catch(() => {
    throw createHttpException(409, unauthorizedMessage);
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

// };

module.exports = {
  register,
};
