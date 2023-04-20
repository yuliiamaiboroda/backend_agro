const { UserModel } = require("../../models");
const { AccessDeniedError, NotFoundError } = require("../../helpers/utils");

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) {
    throw new NotFoundError();
  }

  await UserModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  deleteUserById,
};
