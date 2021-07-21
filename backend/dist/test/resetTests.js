"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const authController = __importStar(require("../controller/auth"));
const User_1 = __importDefault(require("../models/User"));
const responseDefaultObj_1 = __importDefault(require("../utils/forTests/responseDefaultObj"));
describe("resetPassword in settings tests", () => {
    const req = {
        body: {
            userId: 1,
            currentPassword: null,
            newPassword: "1234567",
            newPasswordConfirmation: "not match",
        },
    };
    const res = responseDefaultObj_1.default();
    let stubedUser;
    it("should response with 403 if user not found", async function () {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns({
            select: sinon_1.default.stub().returns(false),
        });
        await authController.resetPassword(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Unauthorized");
    });
    it("should response with 403 if passwords do not match", async function () {
        stubedUser.returns({
            select: sinon_1.default.stub().returns(true),
        });
        await authController.resetPassword(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Passwords do not match");
    });
    it("should fail to compare passwords", async function () {
        req.body.newPasswordConfirmation = "1234567";
        const stubedBcrypt = sinon_1.default.stub(bcryptjs_1.default, "compare");
        stubedBcrypt.returns(false);
        stubedUser.returns({
            select: sinon_1.default.stub().returns(true),
        });
        await authController.resetPassword(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Password is invalid");
        stubedBcrypt.restore();
    });
    it("should change user password and send correct response", async function () {
        req.body.newPasswordConfirmation = "1234567";
        const stubedBcryptCompare = sinon_1.default.stub(bcryptjs_1.default, "compare");
        const stubedBcryptHash = sinon_1.default.stub(bcryptjs_1.default, "hash");
        stubedBcryptCompare.returns(true);
        stubedUser.returns({
            select: sinon_1.default.stub().returns({ password: "", save: sinon_1.default.stub() }),
        });
        stubedBcryptHash.returns("new password");
        await authController.resetPassword(req, res, () => { });
        const user = User_1.default.findOne().select();
        chai_1.expect(user.password).equal("new password");
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).equal("password reseted successfully!");
        stubedUser.restore();
        stubedBcryptCompare.restore();
        stubedBcryptHash.restore();
    });
});
describe("sendResetEmail tests", function () {
    let user;
    let stubedUser;
    let stubedSendGridSend;
    const req = {
        body: { email: "fakeEmail@fake.com" },
        headers: { cookie: "not a csrf cookie" },
    };
    const res = responseDefaultObj_1.default();
    it("should send a csrf error if cant find token in cookie", async function () {
        await authController.sendResetEmail(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("CSRF ERROR");
    });
    it("should send a User not found error if user not found", async function () {
        req.headers.cookie = "XSRF-TOKEN=123";
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns(false);
        await authController.sendResetEmail(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("User not found, Make sure the email is correct");
    });
    it("should set a reset token", async function () {
        sinon_1.default.stub(mail_1.default, "setApiKey");
        stubedSendGridSend = sinon_1.default.stub(mail_1.default, "send");
        stubedUser.returns({ name: "aviram", save: sinon_1.default.stub() });
        await authController.sendResetEmail(req, res, () => { });
        user = await User_1.default.findOne();
        chai_1.expect(user.resetToken.length).equal(64);
        chai_1.expect(user.tokenExpiration).below(Number(new Date(Date.now() + 36000000)));
        stubedUser.restore();
    });
    it("should call sendgrid.send with the right message", async () => {
        const link = `http://localhost:3000/auth/reset-password/${user.resetToken}`;
        const html = `<p>Hey ${user.name.toString()}, Please visit this <a href=${link}>link</a> in order to reset your Hlife account Password.</p><p>This token is valid for only 1 hour.</p>`;
        chai_1.expect(stubedSendGridSend.lastCall.firstArg.to).equal("fakeEmail@fake.com");
        chai_1.expect(stubedSendGridSend.lastCall.firstArg.subject).equal("Hlife reset password");
        chai_1.expect(stubedSendGridSend.lastCall.firstArg.html).equal(html);
    });
    it("should response 200", async function () {
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).equal("Reset Email Sent!");
    });
});
describe("resetPasswordViaToken tests", function () {
    let user;
    let stubedUser;
    const res = responseDefaultObj_1.default();
    const req = {
        body: {
            password: "they are",
            passwordConfirmation: "not a match",
            resetToken: "token",
        },
    };
    it("should send error response for not matching passwords", async function () {
        await authController.resetPasswordViaToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Passwords do not match");
    });
    it("should send error response for wrong token", async function () {
        req.body = {
            password: "they match",
            passwordConfirmation: "they match",
            resetToken: "token",
        };
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns(false);
        await authController.resetPasswordViaToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Invalid Token");
    });
    it("should send error response for expired token", async function () {
        stubedUser.returns({ tokenExpiration: -Infinity });
        await authController.resetPasswordViaToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Token Expired");
    });
    it("should update the user's token", async function () {
        const stubedDate = sinon_1.default.stub(Date, "now");
        const stubedBcrypt = sinon_1.default.stub(bcryptjs_1.default, "hash");
        stubedDate.returns(-Infinity); //'isExpired' will be false
        stubedUser.returns({ save: sinon_1.default.stub(), name: "aviram" });
        stubedBcrypt.returns("123456");
        await authController.resetPasswordViaToken(req, res, () => { });
        user = User_1.default.findOne();
        chai_1.expect(user.resetToken).equal("");
        chai_1.expect(user.tokenExpiration).equal(undefined);
        stubedDate.restore();
        stubedUser.restore();
        stubedBcrypt.restore();
    });
    it("should update the user password", async function () {
        chai_1.expect(user.password).equal("123456");
    });
    it("should return a 200 response", async function () {
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).equal(`${user.name}'s password successfully changed!`);
    });
});
describe("verifyToken tests", function () {
    const req = {
        params: { token: "not match" },
    };
    const res = responseDefaultObj_1.default();
    let stubedUser;
    it("should send error response for invalid token", async function () {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns(false);
        await authController.validateResetToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Invalid Token");
    });
    it("should send error response for expired token", async function () {
        req.params.token = "123456";
        stubedUser.returns({ tokenExpiration: -Infinity });
        await authController.validateResetToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Token Expired");
    });
    it("should return a 200 response", async function () {
        stubedUser.returns(Infinity);
        await authController.validateResetToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).equal("Token Verified Successfully");
        stubedUser.restore();
    });
});
//18 tests
