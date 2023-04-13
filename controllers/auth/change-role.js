const { UserModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");
const mongoose = require("mongoose");

const changeRoleOfUserById = async (req, res, next) => {
  const { role: currentRole } = req.user;
  const { id } = req.params;
  const { role } = req.body;

  if (currentRole !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }
  const idUser = { _id: mongoose.Types.ObjectId(id) };

  const oldUser = await UserModel.findById(idUser);

  await UserModel.findOneAndUpdate(idUser, { role });
  const result = await UserModel.findOne(idUser);

  const { email, name, surname, role: updatedRole } = result;

  res
    .status(200)
    .send({ email, name, surname, updatedRole, oldRole: oldUser.role });
};

module.exports = {
  changeRoleOfUserById,
};
