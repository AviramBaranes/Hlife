import { NextFunction, Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendGridMail from "@sendgrid/mail";

import User, { UserType } from "../models/User";
import { validationErrorsHandler } from "../utils/helpers/Errors/validationErrors";
import createModels from "../utils/helpers/auth/createModels";
import { catchErrorHandler } from "../utils/helpers/Errors/catchErrorsHandler";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const user = (await User.findOne({ email })) as UserType;

    if (user) {
      res.status(403).send("user already exist with this email!");
      return;
    }

    if (password !== passwordConfirmation) {
      res.status(403).send("passwords do not match");
      return;
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
      workouts: [],
    }) as UserType;

    await newUser.save();

    await createModels(newUser);

    const payload = { userId: newUser._id.toString() };
    const token = jwt.sign(payload, process.env.jwtSecret as string, {
      expiresIn: "2d",
    });

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
  } catch (err: any) {
    return catchErrorHandler(err, next);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationErrorsHandler(req);

    const { email, password } = req.body;

    const user = (await User.findOne({ email }).select(
      "+password"
    )) as UserType;

    if (!user) {
      res.status(403).send("User not found, Make sure the email is correct");
      return;
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      res.status(403).send("Password is invalid");
      return;
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.jwtSecret as string, {
      expiresIn: "2d",
    });

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
      });
  } catch (err: any) {
    return catchErrorHandler(err, next);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  try {
    res
      .status(201)
      .clearCookie("jon", {
        path: "/",
      })
      .send("success");
  } catch (err: any) {
    return catchErrorHandler(err, next);
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);

    const { userId } = req;
    const { currentPassword, newPassword, newPasswordConfirmation } = req.body;
    const user = (await User.findById(userId).select("+password")) as UserType;

    if (!user) return res.status(401).send("Unauthorized");

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
  } catch (err: any) {
    return catchErrorHandler(err, next);
  }
};

export const sendResetEmail: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);

    const { email } = req.body;

    const tokenSlice = req.headers.cookie!.split("XSRF-TOKEN=");

    if (tokenSlice!.length < 2) return res.status(403).send("CSRF ERROR");

    const user = (await User.findOne({ email })) as UserType;

    if (!user) {
      return res
        .status(403)
        .send("User not found, Make sure the email is correct");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.tokenExpiration = new Date(Date.now() + 3600000);

    await user.save();

    sendGridMail.setApiKey(process.env.sendGrid_api as string);

    const link = `http://localhost:3000/auth/reset-password/${token}`;
    const message = {
      from: process.env.WALLA_USER as string,
      to: email,
      subject: "Hlife reset password",
      html: `<p>Hey ${user.name.toString()}, Please visit this <a href=${link}>link</a> in order to reset your Hlife account Password.</p><p>This token is valid for only 1 hour.</p>`,
    };

    try {
      await sendGridMail.send(message);
      res.status(200).send("Reset Email Sent!");
      return;
    } catch (error) {
      process.env.Node_ENV !== "test" && console.log(error);
      throw error;
    }
  } catch (err: any) {
    return catchErrorHandler(err, next);
  }
};

export const resetPasswordViaToken: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);

    const { password, passwordConfirmation, resetToken } = req.body;

    const isMatch = password === passwordConfirmation;

    if (!isMatch) return res.status(403).send("Passwords do not match");

    const user = (await User.findOne({ resetToken })) as UserType;

    if (!user) return res.status(403).send("Invalid Token");

    const isExpired = Date.now() > user.tokenExpiration!.getTime();

    if (isExpired) return res.status(403).send("Token Expired");

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetToken = "";
    user.tokenExpiration = undefined;

    await user.save();

    res.status(200).send(`${user.name}'s password successfully changed!`);
  } catch (err: any) {
    return catchErrorHandler(err, next);
  }
};

export const validateResetToken: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.params;

    validationErrorsHandler(req);

    const user = (await User.findOne({ resetToken: token })) as UserType;

    if (!user) return res.status(403).send("Invalid Token");

    const isExpired = Date.now() > user.tokenExpiration!.getTime();

    if (isExpired) return res.status(403).send("Token Expired");

    return res.status(200).send("Token Verified Successfully");
  } catch (err: any) {
    return catchErrorHandler(err, next);
  }
};

export const validateUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = (await User.findById(userId)) as UserType;

    const { hasProgram, username, hasGoals, hasInitialStats, hasAllWorkouts } =
      user;

    res.status(200).json({
      isAuthenticated: true,
      hasProgram,
      hasInitialStats,
      hasAllWorkouts,
      hasGoals,
      username,
    });
  } catch (err: any) {
    return catchErrorHandler(err, next);
  }
};
