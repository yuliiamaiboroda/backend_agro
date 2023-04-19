const { UserModel } = require("../../models");
const { AccessDeniedError, NotFoundError } = require("../../helpers/utils");

const deleteUserById = async (req, res, next) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== "admin") {
    throw new AccessDeniedError();
  }

  const user = await UserModel.findById(id);

  if (!user || !id) {
    throw new NotFoundError();
  }

  await UserModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  deleteUserById,
};
