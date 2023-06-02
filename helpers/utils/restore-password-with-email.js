const nodemailer = require("nodemailer");

const {
  MAIL_SENDER_PASSWORD,
  MAIL_SENDER_HOST,
  MAIL_SENDER_PORT,
  MAIL_SENDER_EMAIL,
} = process.env;

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_SENDER_HOST,
      port: MAIL_SENDER_PORT,
      secure: false,
      auth: {
        user: MAIL_SENDER_EMAIL,
        pass: MAIL_SENDER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: MAIL_SENDER_EMAIL,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
