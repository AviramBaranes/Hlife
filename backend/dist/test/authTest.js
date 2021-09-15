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
//test tools
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
//packages
const mail_1 = __importDefault(require("@sendgrid/mail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//controller to test
const authController = __importStar(require("../controller/auth"));
//models and connections
const User_1 = __importDefault(require("../models/User"));
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
// import Diet from "../models/Diet";
// import DietExecution from "../models/DietExecution";
const Program_1 = __importDefault(require("../models/Program"));
const ProgramExecution_1 = __importDefault(require("../models/ProgramExecution"));
const responseDefaultObj_1 = __importDefault(require("../utils/helpers/forTests/responseDefaultObj"));
let stubedPhysicalStats, stubedProgramExecution, stubedProgram, stubedBcrypt;
// stubedDietModel: SinonStub;
describe("signup Controller error handling", () => {
    let stubedUser;
    const req = {
        body: {
            name: "Avirambr",
            username: "aviramSport2",
            email: "test@test.com",
            password: "testpass123",
            passwordConfirmation: "testpass12",
            gender: "male",
            dateOfBirth: "02/01/2000",
        },
    };
    const res = responseDefaultObj_1.default();
    it("should throw an error if user exist", async function () {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns(true);
        await authController.signup(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("user already exist with this email!");
    });
    it("should throw an error if password do not match", async function () {
        stubedUser.returns(false);
        await authController.signup(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("passwords do not match");
    });
    it("should throw a default error", async function () {
        const error = (await authController.signup({}, {}, () => { }));
        chai_1.expect(error.statusCode).equal(500);
        stubedUser.restore();
    });
});
describe("signup Controller creating the correct models", () => {
    let stubedUser, stubedUserPrototype;
    let createdUserArgs, createdPhysicalStatsArgs, 
    // createdDietArgs: CreatedModelsArgs,
    createdProgramArgs, createdProgramExecutionArgs;
    // createdDietExecutionArgs: CreatedModelsArgs;
    before(async () => {
        const res = responseDefaultObj_1.default();
        const req = {
            body: {
                name: "Avirambr",
                username: "aviramSport2",
                email: "test2@test.com",
                password: "testpass123",
                passwordConfirmation: "testpass123",
                gender: "male",
                dateOfBirth: "02/01/2000",
            },
        };
        stubedPhysicalStats = sinon_1.default.stub(PhysicalStats_1.default.prototype, "save");
        // stubedDietExecution = sinon.stub(DietExecution.prototype, "save");
        stubedProgramExecution = sinon_1.default.stub(ProgramExecution_1.default.prototype, "save");
        stubedProgram = sinon_1.default.stub(Program_1.default.prototype, "save");
        stubedBcrypt = sinon_1.default.stub(bcryptjs_1.default, "hash");
        // stubedDietModel = sinon.stub(Diet.prototype, "save");
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUserPrototype = sinon_1.default.stub(User_1.default.prototype, "save");
        stubedBcrypt.returns("123456");
        stubedUser.returns(false);
        stubedUserPrototype.returns({ _id: 1 });
        // stubedDietModel.returns({ _id: 1 });
        await authController.signup(req, res, () => { });
        createdUserArgs = stubedUserPrototype.firstCall.thisValue;
        createdPhysicalStatsArgs = stubedPhysicalStats.firstCall.thisValue;
        // createdDietArgs = stubedDietModel.firstCall.thisValue;
        createdProgramArgs = stubedProgram.firstCall.thisValue;
        createdProgramExecutionArgs = stubedProgramExecution.firstCall.thisValue;
        // createdDietExecutionArgs = stubedDietExecution.firstCall.thisValue;
    });
    it("should create a user model with the right arguments", async () => {
        chai_1.expect(createdUserArgs._id).to.be.an("object");
        chai_1.expect(createdUserArgs.name).equal("Avirambr");
        chai_1.expect(createdUserArgs.username).equal("aviramSport2");
        chai_1.expect(createdUserArgs.email).equal("test2@test.com");
        chai_1.expect(createdUserArgs.gender).equal("male");
        chai_1.expect(createdUserArgs.grade).equal(0);
        chai_1.expect(createdUserArgs.dateOfBirth).eql(new Date("02/01/2000"));
    });
    it("should create a PhysicalStats model", async () => {
        chai_1.expect(createdPhysicalStatsArgs._id).to.be.an("object");
        chai_1.expect(createdPhysicalStatsArgs.user).eql(createdUserArgs._id);
        chai_1.expect(createdPhysicalStatsArgs.age).equal(2021 - 2000);
        chai_1.expect(createdPhysicalStatsArgs.stats).eql([]);
    });
    // it("should create a Diet model", async () => {
    //   expect(createdDietArgs._id).to.be.an("object");
    //   expect(createdDietArgs.user).eql(createdUserArgs._id);
    //   expect(createdDietArgs.ingredients).eql([]);
    // });
    it("should create a Program model", async () => {
        chai_1.expect(createdProgramArgs._id).to.be.an("object");
        chai_1.expect(createdProgramArgs.user).eql(createdUserArgs._id);
        chai_1.expect(createdProgramArgs.program).eql([]);
    });
    it("should create a ProgramExecution model", async () => {
        chai_1.expect(createdProgramExecutionArgs._id).to.be.an("object");
        chai_1.expect(createdProgramExecutionArgs.user).eql(createdUserArgs._id);
        chai_1.expect(createdProgramExecutionArgs.executions).eql([]);
    });
    // it("should create a UserDietExecution model", async () => {
    //   expect(createdDietExecutionArgs._id).to.be.an("object");
    //   expect(createdDietExecutionArgs.user).eql(createdUserArgs._id);
    //   expect(createdDietExecutionArgs.diet).eql(createdDietArgs._id);
    //   expect(createdDietExecutionArgs.executions).eql([]);
    // });
    after(() => {
        stubedUser.restore();
        stubedUserPrototype.restore();
    });
});
describe("signup controller testing respones", () => {
    let stubedUser, stubedUserPrototype;
    const req = {
        body: {
            name: "Avirambr",
            username: "aviramSport2",
            email: "test@test.com",
            password: "testpass123",
            passwordConfirmation: "testpass123",
            gender: "male",
            dateOfBirth: "02/01/2000",
        },
    };
    const res = responseDefaultObj_1.default();
    before(async () => {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUserPrototype = sinon_1.default.stub(User_1.default.prototype, "save");
        stubedUser.returns(false);
        stubedUserPrototype.returns({ _id: 1 });
        await authController.signup(req, res, () => { });
    });
    it("should send the correct response", () => {
        chai_1.expect(res.statusCode).equal(200);
    });
    it("should set the correct cookie name", () => {
        chai_1.expect(res.cookieName).equal("jon");
    });
    it("should set the correct token", async () => {
        const userData = stubedUserPrototype.firstCall.thisValue;
        const tokenTester = jsonwebtoken_1.default.verify(res.cookieToken, process.env.jwtSecret);
        chai_1.expect(tokenTester.userId).equal(userData._id.toString());
    });
    it("should set the correct cookie configs", () => {
        chai_1.expect(res.cookieConfig.sameSite).equal("strict");
        chai_1.expect(res.cookieConfig.path).equal("/");
        const currentDate = new Date(new Date().getTime() + 24 * 3600 * 1000 * 2 + 100);
        const currentTime = currentDate.getTime();
        const cookieExperetionTime = res.cookieConfig.expires.getTime();
        chai_1.expect(cookieExperetionTime).below(currentTime);
        chai_1.expect(res.cookieConfig.httpOnly).equal(true);
    });
    it("should send the correct message and data", () => {
        chai_1.expect(res.jsonObj.message).equal("Avirambr Sign Up Successfully");
        chai_1.expect(res.jsonObj.username).equal("aviramSport2");
    });
    after(() => {
        stubedUserPrototype.restore();
        stubedUser.restore();
        stubedPhysicalStats.restore();
        // stubedDietExecution.restore();
        stubedProgramExecution.restore();
        stubedProgram.restore();
        stubedBcrypt.restore();
        // stubedDietModel.restore();
    });
});
//14
describe("login controller error handling tests", () => {
    let stubedUser;
    const req = {
        body: { email: "fakeEmail@fake.com", password: "123456" },
    };
    const res = responseDefaultObj_1.default();
    it("should return an error response if email not exist", async function () {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns({
            select: sinon_1.default.stub().returns(false),
        });
        await authController.login(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("User not found, Make sure the email is correct");
    });
    it("should return an error response if password is incorrect", async () => {
        req.body.email = "test@test.com";
        req.body.password = "123456";
        const stubedBcrypt = sinon_1.default.stub(bcryptjs_1.default, "compare");
        stubedUser.returns({
            select: sinon_1.default.stub().returns(true),
        });
        stubedBcrypt.returns(false);
        await authController.login(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Password is invalid");
        stubedBcrypt.restore();
    });
    it("should throw a default error", async () => {
        stubedUser.throws();
        const error = (await authController.login(req, {}, () => { }));
        chai_1.expect(error.statusCode).equal(500);
        stubedUser.restore();
    });
});
describe("login controller testing response", () => {
    let stubedUser, req;
    const res = responseDefaultObj_1.default();
    it("should return 200 status code", async () => {
        req = {
            body: {
                email: "test@test.com",
                password: "123456",
            },
        };
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        const stubedBcrypt = sinon_1.default.stub(bcryptjs_1.default, "compare");
        stubedUser.returns({
            select: sinon_1.default.stub().returns({
                name: "aviram",
                _id: 1,
                username: "avi123",
                hasProgram: true,
                hasDiet: false,
            }),
        });
        stubedBcrypt.returns(true);
        await authController.login(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        stubedUser.restore();
        stubedBcrypt.restore();
    });
    it("should return the correct cookie", () => {
        const { userId } = jsonwebtoken_1.default.verify(res.cookieToken, process.env.jwtSecret);
        chai_1.expect(res.cookieName).equal("jon");
        chai_1.expect(userId).equal(1);
    });
    it("should return the correct cookie settings", function () {
        chai_1.expect(res.cookieConfig.sameSite).equal("strict");
        chai_1.expect(res.cookieConfig.path).equal("/");
        const currentDate = new Date(new Date().getTime() + 24 * 3600 * 1000 * 2);
        const currentTime = currentDate.getTime();
        const cookieExperetionTime = res.cookieConfig.expires.getTime();
        chai_1.expect(cookieExperetionTime).below(currentTime);
        chai_1.expect(res.cookieConfig.httpOnly).equal(true);
    });
    it("should send the correct message and data", function () {
        chai_1.expect(res.jsonObj.message).equal("aviram Logged In Successfully!");
        chai_1.expect(res.jsonObj.username).equal("avi123");
        chai_1.expect(res.jsonObj.hasProgram).equal(true);
    });
});
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
    it("should response with 401 if user not found", async function () {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns({
            select: sinon_1.default.stub().returns(false),
        });
        await authController.resetPassword(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
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
        chai_1.expect(user.tokenExpiration).below(new Date(Date.now() + 36000000));
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
    beforeEach(() => {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
    });
    it("should send an error response for not matching passwords", async function () {
        await authController.resetPasswordViaToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Passwords do not match");
    });
    it("should send an error response for wrong token", async function () {
        req.body = {
            password: "they match",
            passwordConfirmation: "they match",
            resetToken: "token",
        };
        stubedUser.returns(false);
        await authController.resetPasswordViaToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Invalid Token");
    });
    it("should send an error response for expired token", async function () {
        stubedUser.returns({
            tokenExpiration: {
                getTime() {
                    return -Infinity;
                },
            },
        });
        await authController.resetPasswordViaToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Token Expired");
    });
    it("should update the user's token", async function () {
        const stubedDate = sinon_1.default.stub(Date, "now");
        const stubedBcrypt = sinon_1.default.stub(bcryptjs_1.default, "hash");
        stubedDate.returns(-Infinity); //'isExpired' will be false
        stubedUser.returns({
            save: sinon_1.default.spy(),
            name: "aviram",
            tokenExpiration: {
                getTime() {
                    return -Infinity;
                },
            },
        });
        stubedBcrypt.returns("123456");
        await authController.resetPasswordViaToken(req, res, () => { });
        user = User_1.default.findOne();
        chai_1.expect(user.resetToken).equal("");
        chai_1.expect(user.tokenExpiration).equal(undefined);
        stubedDate.restore();
        stubedBcrypt.restore();
    });
    it("should update the user password", async function () {
        chai_1.expect(user.password).equal("123456");
    });
    it("should return a 200 response", async function () {
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).equal(`${user.name}'s password successfully changed!`);
    });
    afterEach(() => {
        stubedUser.restore();
    });
});
describe("validateResetToken tests", function () {
    const req = {
        params: { token: "not match" },
    };
    const res = responseDefaultObj_1.default();
    let stubedUser;
    beforeEach(() => {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
    });
    afterEach(() => {
        stubedUser.restore();
    });
    it("should send an error response for invalid token", async function () {
        stubedUser.returns(false);
        await authController.validateResetToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Invalid Token");
    });
    it("should send an error response for expired token", async function () {
        req.params.token = "123456";
        stubedUser.returns({
            tokenExpiration: {
                getTime() {
                    return -Infinity;
                },
            },
        });
        await authController.validateResetToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Token Expired");
    });
    it("should return a 200 response", async function () {
        stubedUser.returns({
            tokenExpiration: {
                getTime() {
                    return Infinity;
                },
            },
        });
        await authController.validateResetToken(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).equal("Token Verified Successfully");
    });
});
describe("validateUser tests", () => {
    const req = { userId: 1 };
    const res = responseDefaultObj_1.default();
    let stubedUser;
    before(async () => {
        stubedUser = sinon_1.default.stub(User_1.default, "findById");
        stubedUser.returns({
            username: "aviram",
            hasProgram: false,
            hasInitialStats: true,
            hasGoals: true,
        });
        await authController.validateUser(req, res, () => { });
    });
    it("should set the right status code in res", () => {
        chai_1.expect(res.statusCode).equal(200);
    });
    it("should set the right json data in res", () => {
        chai_1.expect(res.jsonObj.isAuthenticated).equal(true);
        chai_1.expect(res.jsonObj.hasProgram).equal(false);
        chai_1.expect(res.jsonObj.hasInitialStats).equal(true);
        chai_1.expect(res.jsonObj.hasGoals).equal(true);
        chai_1.expect(res.jsonObj.username).equal("aviram");
    });
    after(() => {
        stubedUser.restore();
    });
});
