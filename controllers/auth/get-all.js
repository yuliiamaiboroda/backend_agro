const { UserModel } = require("../../models");
const mongoose = require("mongoose");

const getAll = async (req, res, next) => {
  const { id } = req.user;
  const currentUserId = mongoose.Types.ObjectId(id);

  const listAllUsers = await UserModel.find({ _id: { $ne: currentUserId } });

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
  getAll,
};
