const { UserModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const getCertainById = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) {
    throw new NotFoundError();
  }

  const { email, name, surname, role, createdAt, _id } = user;

  res.status(200).json({ email, name, surname, role, createdAt, _id });
};

module.exports = {
  getCertainById,
};
