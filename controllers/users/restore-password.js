const { sendRandomPassword } = require("../../services/send-password");

const restorePassword = async (req, res, next) => {
  const { email } = req.body;

  await sendRandomPassword(email);

  res.status(200).send("your new password sent via email");
};

module.exports = {
  restorePassword,
};
