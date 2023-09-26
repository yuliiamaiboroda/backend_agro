const { UserModel } = require('../../models');
const {
  NotFoundError,
  DeleteTheLastAdminAccountError,
} = require('../../helpers/utils');
const { ROLES_LIST } = require('../../helpers/constants');
// added
const removeById = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  const listOfAdmins = await UserModel.find({ role: ROLES_LIST.admin });

  if (!user) {
    throw new NotFoundError();
  }

  if (listOfAdmins.length <= 1) {
    throw new DeleteTheLastAdminAccountError();
  }

  await UserModel.findByIdAndRemove(id);
  res.status(204).send();
};

module.exports = {
  removeById,
};
