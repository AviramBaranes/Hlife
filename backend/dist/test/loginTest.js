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
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
//packages
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//controller to test
const authController = __importStar(require("../controller/auth"));
//models and connections
const User_1 = __importDefault(require("../models/User"));
//utils
const responseDefaultObj_1 = __importDefault(require("../utils/forTests/responseDefaultObj"));
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
        chai_1.expect(res.statusCode).equal(401);
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
        chai_1.expect(res.statusCode).equal(401);
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
        chai_1.expect(res.jsonObj.hasDiet).equal(false);
    });
});
//7 tests
