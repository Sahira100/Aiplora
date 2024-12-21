const sendEmail = require("./sendEmail");

sendEmail;

const sendResetPasswordEmail = async ({ name, email, passwordToken }) => {
  const ResetPassword = `${process.env.CLIENT_URL}/reset-password?token=${passwordToken}&email=${email}`;

  const message = `<p>Please reset your password by clicking on the fallowing link : <a href="${ResetPassword}">Reset Password</a></p>`;

  await sendEmail({
    to: email,
    subject: "Password Reset",
    html: `<h4>Hello ${name},</h4> ${message}`,
  });
};
module.exports = sendResetPasswordEmail;
