const { UserModel } = require("../../models");
const { AccessDeniedError } = require("../../helpers/utils");

const getAllUser = async (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw new AccessDeniedError();
  }
  const listAllUsers = await UserModel.find();

  const accessedDataList = listAllUsers.map(
    ({ email, name, surname, role, _id }) => ({
      email,
      name,
      surname,
      role,
      _id,
    })
  );

  res.status(200).json(accessedDataList);
};

module.exports = {
  getAllUser,
};
