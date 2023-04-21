const { UserModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const removeById = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) {
    throw new NotFoundError();
  }

  await UserModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  removeById,
};
