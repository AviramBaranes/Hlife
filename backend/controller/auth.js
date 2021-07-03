const User = require("../models/User");

const validationErrorsHandler = require("../utils/helpers/valdiationErrors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const createModels = require("../utils/helpers/createModels");
const sendGridMail = require("@sendgrid/mail");

exports.signup = async (req, res, next) => {
  try {
    validationErrorsHandler(req);

    const {
      name,
      username,
      email,
      password,
      passwordConfirmation,
      gender,
      dateOfBirth,
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).send("user already exist with this email!");
    }

    if (password !== passwordConfirmation) {
      return res.status(401).send("passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      grade: 0,
    });

    const savedUser = await newUser.save();

    await createModels(savedUser, newUser);

    const payload = { userId: savedUser._id.toString() };
    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "2d" });

    const message = `${name} Sign Up Successfully`;

    res
      .status(200)
      .cookie("jon", token, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2), //day * hour *second*2 = 2days
        httpOnly: true,
      })
      .json({ message, username });
    //
  } catch (err) {
    return catchErrorHandler(err, next);
  }
};

exports.login = async (req, res, next) => {
  try {
    validationErrorsHandler(req);

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .send("User not found, Make sure the email is correct");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).send("Password is invalid");
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "2d" });

    const message = `${user.name} Logged In Successfully!`;

    res
      .status(200)
      .cookie("jon", token, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2),
        httpOnly: true,
      })
      .json({
        message,
        username: user.username,
        hasProgram: user.hasProgram,
        hasDiet: user.hasDiet,
      });
  } catch (err) {
    return catchErrorHandler(err, next);
  }
};

exports.logout = (req, res, next) => {
  try {
    res
      .status(201)
      .clearCookie("jon", {
        path: "/",
      })
      .send("success");
  } catch (err) {
    return catchErrorHandler(err, next);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    validationErrorsHandler(req);

    const { userId, currentPassword, newPassword, newPasswordConfirmation } =
      req.body;

    const user = await User.findById(userId).select("+password");

    if (!user) return res.status(403).send("Unauthorized");

    const isMatch = newPassword === newPasswordConfirmation;

    if (!isMatch) return res.status(403).send("Passwords do not match");

    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCorrectPassword) return res.status(403).send("Password is invalid");

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedNewPassword;

    await user.save();

    res.status(200).send("password reseted successfully!");
  } catch (err) {
    return catchErrorHandler(err, next);
  }
};

exports.sentResetEmail = async (req, res, next) => {
  try {
    validationErrorsHandler(req);

    const { email } = req.body;

    const tokenSlice = req.headers.cookie.split("XSRF-TOKEN=");

    if (tokenSlice.length < 2) return res.status(403).send("CSRF ERROR");

    const csrfToken = tokenSlice[1].split(";")[0];

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .send("User not found, Make sure the email is correct");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.tokenExpiration = Date.now() + 3600000;

    await user.save();

    sendGridMail.setApiKey(process.env.sendGrid_api);

    const link = `http://localhost:3000/auth/reset-password/${token}`;

    const message = {
      from: process.env.WALLA_USER,
      to: email,
      subject: "Hlife reset password",
      html: `<p>Hey ${user.name.toString()}, Please visit this <a href=${link}>link</a> in order to reset your Hlife account Password.
            
            </p>
            <p>This token is valid for only 1 hour.</p>`,
    };

    try {
      await sendGridMail.send(message);
      res.status(200).send("Reset Email Sent!");
      console.log("Success!");
    } catch (err) {
      process.env.Node_ENV !== "test" && console.log(error);
      throw error;
    }
  } catch (err) {
    return catchErrorHandler(err, next);
  }
};

exports.resetPasswordViaToken = async (req, res, next) => {
  try {
    validationErrorsHandler(req);

    const { password, passwordConfirmation, resetToken } = req.body;

    const isMatch = password === passwordConfirmation;

    if (!isMatch) return res.status(403).send("Passwords do not match");

    const user = await User.findOne({ resetToken });

    if (!user) return res.status(403).send("Invalid Token");

    const isExpired = Date.now() > user.tokenExpiration;

    if (isExpired) return res.status(403).send("Token Expired");

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetToken = "";
    user.tokenExpiration = undefined;

    await user.save();

    res.status(200).send(`${user.name}'s password successfully changed!`);
  } catch (err) {
    return catchErrorHandler(err, next);
  }
};

exports.validateResetToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ resetToken: token });

    if (!user) return res.status(403).send("Invalid Token");

    const isExpired = Date.now() > user.tokenExpiration;

    if (isExpired) return res.status(403).send("Token Expired");

    return res.status(200).send("Token Verified Successfully");
  } catch (err) {
    return catchErrorHandler(err, next);
  }
};

exports.validateUser = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);

    res.status(200).json({
      isAuthenticated: true,
      username: user.username,
      hasProgram: user.hasProgram,
      hasDiet: user.hasDiet,
      userId,
    });
  } catch (err) {
    return catchErrorHandler(err, next);
  }
};

const catchErrorHandler = (err, next) => {
  process.env.Node_ENV !== "test" && console.log(err);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
  return err;
};
