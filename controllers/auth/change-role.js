const { UserModel } = require("../../models");
const { AccessDeniedError, NotFoundError } = require("../../helpers/utils");

const changeRoleOfUserById = async (req, res, next) => {
  const { role } = req.user;

  const { id } = req.params;

  const oldUser = await UserModel.findById(id);

  if (!oldUser) {
    throw new NotFoundError();
  }

  await UserModel.findOneAndUpdate(id, { role });

  const result = await UserModel.findById(id);

  const { email, name, surname, role: updatedRole } = result;

  res.status(200).send({ email, name, surname, updatedRole, oldRole: role });
};

module.exports = {
  changeRoleOfUserById,
};
