const { sendRandomPassword } = require('../../services/send-password');
// added
const restorePassword = async (req, res, next) => {
  const { email } = req.body;

  await sendRandomPassword(email, next)
    .then(res.status(200).send('your new password sent via email'))
    .catch(err => {
      throw new Error(`${err}`);
    });
};

module.exports = {
  restorePassword,
};
