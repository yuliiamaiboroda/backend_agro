const nodemailer = require("nodemailer");

const {
  MAIL_SENDER_PASSWORD,
  MAIL_SENDER_HOST,
  MAIL_SENDER_PORT,
  MAIL_SENDER_EMAIL,
} = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_SENDER_HOST,
  port: MAIL_SENDER_PORT,
  secure: true,
  auth: {
    user: MAIL_SENDER_EMAIL,
    pass: MAIL_SENDER_PASSWORD,
  },
});

const sendEmail = async (email, subject, text) => {
  try {
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Connected to server");
          resolve(success);
        }
      });
    });

    const mailData = {
      from: MAIL_SENDER_EMAIL,
      to: email,
      subject: subject,
      text: text,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent ");
    throw new Error(`${error}`);
  }
};

module.exports = sendEmail;
