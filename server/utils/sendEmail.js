const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"LOL 😎" <maddison53@ethereal.email>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
};

module.exports = sendEmail;
