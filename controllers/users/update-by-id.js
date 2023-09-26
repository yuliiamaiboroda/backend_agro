const { UserModel } = require('../../models');
const { NotFoundError, EmailUsedError } = require('../../helpers/utils');
const bcrypt = require('bcrypt');
// added
const updateById = async (req, res, next) => {
  const { id } = req.params;

  const {
    email: newEmail,
    name: newName,
    surname: newSurname,
    role: newRole,
    password,
  } = req.body;

  const oldUser = await UserModel.findById(id);

  if (!oldUser) {
    throw new NotFoundError();
  }

  let passwordHash;

  if (password) {
    passwordHash = await bcrypt.hash(password, 10);
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
      {
        email: newEmail,
        name: newName,
        surname: newSurname,
        role: newRole,
        passwordHash: password ? passwordHash : oldUser.passwordHash,
      },
      { returnDocument: 'after', runValidators: true }
    );

    res.status(200).json({ email, name, surname, role, _id: userId });
  } catch (error) {
    throw new EmailUsedError();
  }
};

module.exports = {
  updateById,
};
