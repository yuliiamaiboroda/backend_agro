const {
  NotFoundError,
  randomPassword,
  sendEmail,
} = require("../../helpers/utils");
const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");

const restorePassword = async (req, res, next) => {
  const { email, id } = req.user;

  if (!email) {
    throw new NotFoundError();
  }

  const newPassword = randomPassword();
  const passwordHash = await bcrypt.hash(newPassword, 10);
  try {
    sendEmail(
      email,
      "Тимчасовий пароль",
      `Це ваш тимчасовий пароль: ${newPassword}. Будь ласка змінить його при настопному вході в аккаунт`
    );
    await UserModel.findByIdAndUpdate(
      id,
      { passwordHash },
      { runValidators: true }
    );
  } catch (err) {
    next(err);
  }
  res.status(200).send("your new password sent via email");
};

module.exports = {
  restorePassword,
};
