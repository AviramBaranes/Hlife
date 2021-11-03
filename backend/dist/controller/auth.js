"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.validateResetToken = exports.resetPasswordViaToken = exports.sendResetEmail = exports.resetPassword = exports.logout = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../models/User"));
const validationErrors_1 = require("../utils/helpers/Errors/validationErrors");
const createModels_1 = __importDefault(require("../utils/helpers/auth/createModels"));
const catchErrorsHandler_1 = require("../utils/helpers/Errors/catchErrorsHandler");
const signup = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { name, email, password, passwordConfirmation, gender, dateOfBirth } = req.body;
        const user = (await User_1.default.findOne({ email }));
        if (user) {
            res.status(403).send('user already exist with this email!');
            return;
        }
        if (password !== passwordConfirmation) {
            res.status(403).send('passwords do not match');
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const newUser = new User_1.default({
            name,
            email,
            password: hashedPassword,
            gender,
            dateOfBirth,
            grade: 0,
            workouts: [],
        });
        await newUser.save();
        await (0, createModels_1.default)(newUser);
        const payload = { userId: newUser._id.toString() };
        const token = jsonwebtoken_1.default.sign(payload, process.env.jwtSecret, {
            expiresIn: '2d',
        });
        const message = `${name} Sign Up Successfully`;
        res
            .status(200)
            .cookie('jon', token, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2),
            httpOnly: true,
        })
            .json({ message });
        //
    }
    catch (err) {
        return (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { email, password } = req.body;
        const user = (await User_1.default.findOne({ email }).select('+password'));
        if (!user) {
            res.status(403).send('User not found, Make sure the email is correct');
            return;
        }
        const isCorrectPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isCorrectPassword) {
            res.status(403).send('Password is invalid');
            return;
        }
        const payload = { userId: user._id };
        const token = jsonwebtoken_1.default.sign(payload, process.env.jwtSecret, {
            expiresIn: '2d',
        });
        const message = `${user.name} Logged In Successfully!`;
        res
            .status(200)
            .cookie('jon', token, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2),
            httpOnly: true,
        })
            .json({
            message,
            hasProgram: user.hasProgram,
        });
    }
    catch (err) {
        return (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.login = login;
const logout = (req, res, next) => {
    try {
        res
            .status(201)
            .clearCookie('jon', {
            path: '/',
        })
            .send('success');
    }
    catch (err) {
        return (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.logout = logout;
const resetPassword = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { userId } = req;
        const { currentPassword, newPassword, newPasswordConfirmation } = req.body;
        const user = (await User_1.default.findById(userId).select('+password'));
        if (!user)
            return res.status(401).send('Unauthorized');
        const isMatch = newPassword === newPasswordConfirmation;
        if (!isMatch)
            return res.status(403).send('Passwords do not match');
        const isCorrectPassword = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isCorrectPassword)
            return res.status(403).send('Password is invalid');
        const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, 12);
        user.password = hashedNewPassword;
        await user.save();
        res.status(200).send('password reseted successfully!');
    }
    catch (err) {
        return (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.resetPassword = resetPassword;
const sendResetEmail = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { email } = req.body;
        const tokenSlice = req.headers.cookie.split('XSRF-TOKEN=');
        if (tokenSlice.length < 2)
            return res.status(403).send('CSRF ERROR');
        const user = (await User_1.default.findOne({ email }));
        if (!user) {
            return res
                .status(403)
                .send('User not found, Make sure the email is correct');
        }
        const token = crypto_1.default.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.tokenExpiration = new Date(Date.now() + 3600000);
        await user.save();
        const transporter = nodemailer_1.default.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.OUTLOOK_USER,
                pass: process.env.OUTLOOK_PASSWORD,
            },
        });
        // sendGridMail.setApiKey(process.env.sendGrid_api as string);
        const link = `http://localhost:3000/auth/reset-password/${token}`;
        const message = {
            from: process.env.OUTLOOK_USER,
            to: email,
            subject: 'Hlife reset password',
            html: `<p>Hey ${user.name.toString()}, Please visit this <a href=${link}>link</a> in order to reset your Hlife account Password.</p><p>This token is valid for only 1 hour.</p>`,
        };
        try {
            transporter.sendMail(message, function (error, info) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).send('Reset Email Sent!');
            return;
        }
        catch (error) {
            process.env.Node_ENV !== 'test' && console.log(error);
            throw error;
        }
    }
    catch (err) {
        return (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.sendResetEmail = sendResetEmail;
const resetPasswordViaToken = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { password, passwordConfirmation, resetToken } = req.body;
        const isMatch = password === passwordConfirmation;
        if (!isMatch)
            return res.status(403).send('Passwords do not match');
        const user = (await User_1.default.findOne({ resetToken }));
        if (!user)
            return res.status(403).send('Invalid Token');
        const isExpired = Date.now() > user.tokenExpiration.getTime();
        if (isExpired)
            return res.status(403).send('Token Expired');
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        user.password = hashedPassword;
        user.resetToken = '';
        user.tokenExpiration = undefined;
        await user.save();
        res.status(200).send(`${user.name}'s password successfully changed!`);
    }
    catch (err) {
        return (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.resetPasswordViaToken = resetPasswordViaToken;
const validateResetToken = async (req, res, next) => {
    try {
        const { token } = req.params;
        (0, validationErrors_1.validationErrorsHandler)(req);
        const user = (await User_1.default.findOne({ resetToken: token }));
        if (!user)
            return res.status(403).send('Invalid Token');
        const isExpired = Date.now() > user.tokenExpiration.getTime();
        if (isExpired)
            return res.status(403).send('Token Expired');
        return res.status(200).send('Token Verified Successfully');
    }
    catch (err) {
        return (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.validateResetToken = validateResetToken;
const validateUser = async (req, res, next) => {
    try {
        const { userId } = req;
        const user = (await User_1.default.findById(userId));
        const { hasProgram, hasGoals, hasInitialStats, hasAllWorkouts, grade } = user;
        res.status(200).json({
            isAuthenticated: true,
            hasProgram,
            hasInitialStats,
            hasAllWorkouts,
            hasGoals,
            grade,
        });
    }
    catch (err) {
        return (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.validateUser = validateUser;
