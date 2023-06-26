const {
  NotFoundError,
  randomPassword,
  sendEmail,
} = require("../../helpers/utils");
const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");

const sendRandomPassword = async (email) => {
  if (!email) {
    throw new NotFoundError();
  }
  const userWithEmail = await UserModel.findOne({ email });

  if (!userWithEmail) {
    throw new NotFoundError();
  }

  const newPassword = randomPassword();
  const passwordHash = await bcrypt.hash(newPassword, 10);

  try {
    sendEmail(
      email,
      "Тимчасовий пароль",
      `Це ваш тимчасовий пароль: ${newPassword}. Будь ласка, змініть його при наступному вході в аккаунт`
    );
    await UserModel.findOneAndUpdate(
      { email },
      { passwordHash },
      { runValidators: true }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { sendRandomPassword };
