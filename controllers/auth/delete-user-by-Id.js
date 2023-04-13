const { UserModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");
const mongoose = require("mongoose");

const deleteUserById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }
  const idUser = { _id: mongoose.Types.ObjectId(id) };

  await UserModel.findByIdAndRemove(idUser);
  res.status(204).send();
};

module.exports = {
  deleteUserById,
};
