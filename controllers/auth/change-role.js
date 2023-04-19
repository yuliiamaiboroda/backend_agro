const { UserModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const changeRoleOfUserById = async (req, res, next) => {
  const { role: currentRole } = req.user;
  const { id } = req.params;
  const { role } = req.body;

  if (currentRole !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
  }

  const oldUser = await UserModel.findById(id);

  if (!oldUser) {
    throw createHttpException(RESPONSE_ERRORS.notFound);
  }

  await UserModel.findOneAndUpdate(id, { role });

  const result = await UserModel.findById(id);

  const { email, name, surname, role: updatedRole } = result;

  res
    .status(200)
    .send({ email, name, surname, updatedRole, oldRole: oldUser.role });
};

module.exports = {
  changeRoleOfUserById,
};
