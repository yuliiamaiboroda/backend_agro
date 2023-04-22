const { UserModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const changeRoleById = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  const oldUser = await UserModel.findById(id);

  if (!oldUser) {
    throw new NotFoundError();
  }

  const { role: oldRole } = oldUser;

  const {
    email,
    name,
    surname,
    role: updatedRole,
    id: userId,
  } = await UserModel.findByIdAndUpdate(
    id,
    { role },
    { returnDocument: "after", runValidators: true }
  );

  res.status(200).json({ email, name, surname, oldRole, updatedRole, userId });
};

module.exports = {
  changeRoleById,
};
