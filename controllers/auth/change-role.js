const { UserModel } = require("../../models");
const { AccessDeniedError, NotFoundError } = require("../../helpers/utils");

const changeRoleOfUserById = async (req, res, next) => {
  const { role: currentRole } = req.user;
  const { id } = req.params;
  const { role } = req.body;

  if (currentRole !== "admin") {
    throw new AccessDeniedError();
  }

  const oldUser = await UserModel.findById(id);

  if (!oldUser) {
    throw new NotFoundError();
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
