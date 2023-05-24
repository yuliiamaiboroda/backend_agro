const { UserModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const getCertainById = async (req, res, next) => {
  const { userId } = req.params;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundError();
  }

  const { email, name, surname, role, createdAt } = user;

  res.status(200).json({ email, name, surname, role, createdAt });
};

module.exports = {
  getCertainById,
};
