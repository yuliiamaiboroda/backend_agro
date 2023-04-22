const { UserModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const changeRoleById = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  const oldUser = await UserModel.findById(id);
  const { role: oldRole } = oldUser;

  if (!oldUser) {
    throw new NotFoundError();
  }

  await UserModel.findByIdAndUpdate(id, { role });

  const {
    email,
    name,
    surname,
    role: updatedRole,
    id: userId,
  } = await UserModel.findById(id);

  res.status(200).json({ email, name, surname, oldRole, updatedRole, userId });
};

module.exports = {
  changeRoleById,
};
