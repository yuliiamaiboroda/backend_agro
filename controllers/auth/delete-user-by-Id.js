const { UserModel } = require("../../models");
const { createHttpException } = require("../../helpers");
const mongoose = require("mongoose");

const deleteUserById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin") {
    throw createHttpException(403, "do not have access rights to the content");
  }
  const idUser = { _id: mongoose.Types.ObjectId(id) };

  await UserModel.findByIdAndRemove(idUser);
  res.status(204).send();
};

module.exports = {
  deleteUserById,
};
