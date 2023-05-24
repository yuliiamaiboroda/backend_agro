const bcrypt = require("bcrypt");
const { UserModel } = require("../../models");
const { UnauthorizedError } = require("../../helpers/utils");

const updatePassword = async (req, res, next) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  const userInstanseOrNull = await UserModel.findById(id);

  if (!userInstanseOrNull) {
    throw new UnauthorizedError();
  }

  const isValidPassword = await bcrypt.compare(
    oldPassword,
    userInstanseOrNull.passwordHash
  );

  if (!isValidPassword) {
    throw new UnauthorizedError();
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await UserModel.findByIdAndUpdate(id, { passwordHash });

  res.status(200).send("Password changed successfully");
};

module.exports = {
  updatePassword,
};
