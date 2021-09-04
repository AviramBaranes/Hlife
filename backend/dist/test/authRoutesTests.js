"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const app_1 = __importDefault(require("../app"));
const User_1 = __importDefault(require("../models/User"));
const sinon_1 = __importDefault(require("sinon"));
const user = new User_1.default({
    name: "-",
    username: "-",
    email: "-",
    password: "-",
    gender: "male",
    dateOfBirth: "01/01/2005",
});
const payload = { userId: user._id.toString() };
const token = jsonwebtoken_1.default.sign(payload, process.env.jwtSecret, {
    expiresIn: "2d",
});
describe("signup route test", () => {
    it("should send a validation error response for invalid values", async () => {
        const payload = JSON.stringify({
            name: "3",
            username: "4-",
            email: "not-an-email",
            password: "123456ab",
            passwordConfirmation: "123-",
            gender: "not-valid",
            dateOfBirth: "01-01-2006",
        });
        const response = await supertest_1.default(app_1.default)
            .post("/auth/signup")
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.data[0].msg).equal("name only allow letters");
        chai_1.expect(response.body.data[0].value).equal("3");
        chai_1.expect(response.body.data[1].msg).equal("name must be at least 3 characters");
        chai_1.expect(response.body.data[2].msg).equal("username must be at least 3 characters");
        chai_1.expect(response.body.data[2].value).equal("4-");
        chai_1.expect(response.body.data[3].msg).equal("username only allow letters and numbers");
        chai_1.expect(response.body.data[4].msg).equal("please enter a correct email");
        chai_1.expect(response.body.data[4].value).equal("not-an-email");
        chai_1.expect(response.body.data[5].msg).equal("password need to be at least 6 characters");
        chai_1.expect(response.body.data[5].value).equal("123-");
        chai_1.expect(response.body.data[6].msg).equal("password only allow letters and numbers");
        chai_1.expect(response.body.data[7].msg).equal("gender is invalid");
        chai_1.expect(response.body.data[7].value).equal("not-valid");
        chai_1.expect(response.body.data[8].msg).equal('The field must be a date between "01/01/1920" and "01/01/2005"');
        chai_1.expect(response.body.data[8].value).equal("01-01-2006");
    });
    it("should finish validation middleware successfully", async () => {
        const stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns(true);
        const payload = JSON.stringify({
            name: "aviram",
            username: "aviram11",
            email: "email@email.com",
            password: "1234ab",
            passwordConfirmation: "1234ab",
            gender: "male",
            dateOfBirth: "11-11-2001",
        });
        const response = await supertest_1.default(app_1.default)
            .post("/auth/signup")
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("user already exist with this email!");
        stubedUser.restore();
    });
});
describe("login route test", () => {
    it("should send a validation error response for invalid values", async () => {
        const payload = JSON.stringify({
            email: "not-an-email",
            password: "123",
        });
        const response = await supertest_1.default(app_1.default)
            .post("/auth/login")
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.data[0].msg).equal("please enter a correct email");
        chai_1.expect(response.body.data[0].value).equal("not-an-email");
        chai_1.expect(response.body.data[1].msg).equal("Invalid password, At least 6 characters for a password");
        chai_1.expect(response.body.data[1].value).equal("123");
    });
    it("should finish validation middleware successfully", async () => {
        const stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns({
            select() {
                return false;
            },
        });
        const payload = JSON.stringify({
            email: "email@email.com",
            password: "1234ab",
        });
        const response = await supertest_1.default(app_1.default)
            .post("/auth/login")
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("User not found, Make sure the email is correct");
        stubedUser.restore();
    });
});
describe("logout route", () => {
    it("should send an error response for unauthorized user", async () => {
        const response = await supertest_1.default(app_1.default).post("/auth/logout");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send a success response", async () => {
        const response = await supertest_1.default(app_1.default)
            .post("/auth/logout")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.statusCode).equal(201);
        chai_1.expect(response.text).equal("success");
    });
});
describe("reset password via settings route", () => {
    it("should send an error response for unauthorized user", async () => {
        const response = await supertest_1.default(app_1.default).post("/auth/settings/password-reset");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send an error response if validation failed", async () => {
        const payload = JSON.stringify({
            currentPassword: "123-",
            newPassword: "123-",
            newPasswordConfirmation: "123-",
        });
        const response = await supertest_1.default(app_1.default)
            .post("/auth/settings/password-reset")
            .set("Cookie", [`jon=${token}`])
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        //currentPassword
        chai_1.expect(response.body.data[0].value).equal("123-");
        chai_1.expect(response.body.data[0].msg).equal("password need to be at least 6 characters");
        chai_1.expect(response.body.data[3].msg).equal("password only allow letters and numbers");
        //new password
        chai_1.expect(response.body.data[1].value).equal("123-");
        chai_1.expect(response.body.data[1].msg).equal("password need to be at least 6 characters");
        chai_1.expect(response.body.data[4].msg).equal("password only allow letters and numbers");
        //new password confirmation
        chai_1.expect(response.body.data[2].value).equal("123-");
        chai_1.expect(response.body.data[2].msg).equal("password need to be at least 6 characters");
        chai_1.expect(response.body.data[5].msg).equal("password only allow letters and numbers");
    });
    it("should move from the validation middleware successfully", async () => {
        const stubedUser = sinon_1.default.stub(User_1.default, "findById");
        stubedUser.returns({
            select() {
                return false;
            },
        });
        const payload = JSON.stringify({
            currentPassword: "123abc",
            newPassword: "123abc",
            newPasswordConfirmation: "123abc",
        });
        const response = await supertest_1.default(app_1.default)
            .post("/auth/settings/password-reset")
            .set("Cookie", [`jon=${token}`])
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.text).equal("Unauthorized");
        stubedUser.restore();
    });
});
describe("send email route test", () => {
    it("should send a validation error response for invalid values", async () => {
        const payload = JSON.stringify({
            email: "not-an-email",
        });
        const response = await supertest_1.default(app_1.default)
            .post("/auth/password/send-token")
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.data[0].msg).equal("Invalid Email");
        chai_1.expect(response.body.data[0].value).equal("not-an-email");
    });
    it("should finish validation middleware successfully", async () => {
        const payload = JSON.stringify({
            email: "email@email.com",
            password: "1234ab",
        });
        const response = await supertest_1.default(app_1.default)
            .post("/auth/password/send-token")
            .set("Content-type", "application/json")
            .set("Cookie", ["no csrf"])
            .send(payload);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("CSRF ERROR");
    });
});
describe("reset via email route test", () => {
    it("should send a validation error response for invalid values", async () => {
        const payload = JSON.stringify({
            password: "123-",
            passwordConfirmation: "123-",
        });
        const response = await supertest_1.default(app_1.default)
            .put("/auth/reset/password-reset")
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.statusCode).equal(422);
        //password
        chai_1.expect(response.body.data[0].msg).equal("password need to be at least 6 characters");
        chai_1.expect(response.body.data[0].value).equal("123-");
        chai_1.expect(response.body.data[2].msg).equal("password only allow letters and numbers");
        //passwordConfirmation
        chai_1.expect(response.body.data[1].value).equal("123-");
        chai_1.expect(response.body.data[1].msg).equal("password need to be at least 6 characters");
        chai_1.expect(response.body.data[3].msg).equal("password only allow letters and numbers");
    });
    it("should finish validation middleware successfully", async () => {
        const payload = JSON.stringify({
            password: "1234ab",
            passwordConfirmation: "1234ac",
        });
        const response = await supertest_1.default(app_1.default)
            .put("/auth/reset/password-reset")
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("Passwords do not match");
    });
});
describe("validate reset token route", () => {
    it("should send a validation error response for invalid values", async () => {
        const response = await supertest_1.default(app_1.default).get("/auth/reset/validate-token/not-long-enough");
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.body.data[0].msg).equal("Invalid Token, too short");
        chai_1.expect(response.body.data[0].value).equal("not-long-enough");
    });
    it("should finish validation middleware successfully", async () => {
        const stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns(false);
        const token = crypto_1.default.randomBytes(32).toString("hex");
        const response = await supertest_1.default(app_1.default).get(`/auth/reset/validate-token/${token}`);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("Invalid Token");
        stubedUser.restore();
    });
});
describe("validateUser route", () => {
    it("should send an error response for unauthorized user", async () => {
        const response = await supertest_1.default(app_1.default).get("/auth/isUser");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send a success response", async () => {
        const stubedUser = sinon_1.default.stub(User_1.default, "findById");
        stubedUser.returns({ username: "-", hasProgram: "-" });
        const response = await supertest_1.default(app_1.default)
            .get("/auth/isUser")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.statusCode).equal(200);
        stubedUser.restore();
    });
});
