const { UserModel } = require("../../models");
const { NotFoundError } = require("../../helpers/utils");

const current = async (req, res, next) => {
  const { id } = req.user;
  const currentUser = await UserModel.findById(id);

  if (!currentUser) {
    throw new NotFoundError();
  }

  const { email, password, name, surname, role } = currentUser;
  res.status(200).json({ email, password, name, surname, role });
};

module.exports = {
  current,
};
