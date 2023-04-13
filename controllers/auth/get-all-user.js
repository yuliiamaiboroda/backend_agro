const { UserModel } = require("../../models");
const { createHttpException } = require("../../helpers/utils");
const { RESPONSE_ERRORS } = require("../../helpers/constants");

const getAllUser = async (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw createHttpException(RESPONSE_ERRORS.accessDenied);
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
