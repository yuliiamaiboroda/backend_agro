const { UserModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const deleteUserById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  const user = await UserModel.findById(id);

  if (!user || !id) {
    throw createHttpException(RESPONSE_ERRORS.notFound);
  }

  await UserModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  deleteUserById,
};
