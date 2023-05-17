const { UserModel } = require("../../models");
const { NotFoundError, EmailUsedError } = require("../../helpers/utils");

const updateById = async (req, res, next) => {
  const { id } = req.params;

  const {
    email: newEmail,
    name: newName,
    surname: newSurname,
    role: newRole,
  } = req.body;

  const oldUser = await UserModel.findById(id);

  if (!oldUser) {
    throw new NotFoundError();
  }

  const { id: idFromUserModel } = await UserModel.findOne({ newEmail });

  if (idFromUserModel !== id) {
    throw new EmailUsedError();
  }

  try {
    const {
      email,
      name,
      surname,
      role,
      id: userId,
    } = await UserModel.findByIdAndUpdate(
      id,
      { email: newEmail, name: newName, surname: newSurname, role: newRole },
      { returnDocument: "after", runValidators: true }
    );

    res.status(200).json({ email, name, surname, role, _id: userId });
  } catch (error) {
    throw new EmailUsedError();
  }
};

module.exports = {
  updateById,
};
