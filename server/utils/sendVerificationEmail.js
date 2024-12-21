const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({ name, email, verificationToken }) => {
  const verifyEmail = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the fallowing link : <a href="${verifyEmail}">Verify Email</a></p>`;

  await sendEmail({
    to: email,
    subject: "Email Verification",
    html: `<h4>Hello ${name},</h4> ${message}`,
  });
};

module.exports = sendVerificationEmail;
