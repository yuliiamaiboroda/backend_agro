const { sendRandomPassword } = require("../../services/send-password");

const restorePassword = async (req, res, next) => {
  const { email } = req.body;

  await sendRandomPassword(email)
    .then(res.status(200).send("your new password sent via email"))
    .catch((err) => next(err));
};

module.exports = {
  restorePassword,
};
