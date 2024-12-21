const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const { STATUS_CODES } = require("http");

//*REGISTER
const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = false; // (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const twoHours = 1000 * 60 * 60 * 2;

  const verificationTokenExpirationDate = new Date(Date.now() + twoHours);

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
    verificationTokenExpirationDate,
  });

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Please check your email to verify account",
  });

  // const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  // res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

//*REQUEST VERIFICATION EMAIL
const verificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError("Please provide email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (user.isVerified) {
    throw new CustomError.BadRequestError("Invalid verification");
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const twoHours = 1000 * 60 * 60 * 2;

  const verificationTokenExpirationDate = new Date(Date.now() + twoHours);

  user.verificationToken = verificationToken;
  user.verificationTokenExpirationDate = verificationTokenExpirationDate;
  await user.save();

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Please check your email to verify account",
  });
};

//*VERIFY EMAIL
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  if (!verificationToken || !email) {
    throw new CustomError.BadRequestError(
      "Please provide verification token and email"
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (
    user.verificationToken !== verificationToken ||
    user.verificationTokenExpirationDate < Date.now()
  ) {
    throw new CustomError.BadRequestError("verification failed");
  }

  user.isVerified = true;
  user.verificationTokenExpirationDate = null;
  user.verificationToken = "";
  user.verified = Date.now();

  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Email is verified" });
};

//*LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthorizedError("Please verify your email");
  }

  const tokenUser = createTokenUser(user);

  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    if (!existingToken.isValid) {
      throw new CustomError.UnauthorizedError("Invalid credintial");
    }

    const refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        user: tokenUser,
      },
    });
    return;
  }

  let refreshToken = "";

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      user: tokenUser,
    },
  });
};

//*LOGOUT
const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "User logged out",
  });
};

//*FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError("Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(40).toString("hex");

    const fiveMinutes = 1000 * 60 * 5;
    const passwordTokenExpirationDate = new Date(Date.now() + fiveMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;

    await user.save();

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      passwordToken,
    });
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Please check your email for the password reset link",
  });
};

//*RESET PASSWORD
const resetPassword = async (req, res) => {
  const { email, passwordToken, password } = req.body;

  if (!email || !passwordToken || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(passwordToken) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;

      await user.save();
    }
  }

  res
    .status(STATUS_CODES.OK)
    .json({ status: "success", message: "Password is rested" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  verificationEmail,
  forgotPassword,
  resetPassword,
};
