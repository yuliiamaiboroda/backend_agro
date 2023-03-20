const { UserModel } = require("../../models");
const { createHttpException } = require("../../helpers");

const getAllUser = async (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw createHttpException(403, "do not have access rights to the content");
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
