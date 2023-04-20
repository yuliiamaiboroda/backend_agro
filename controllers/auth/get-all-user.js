const { UserModel } = require("../../models");

const getAllUser = async (req, res, next) => {
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
