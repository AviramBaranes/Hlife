"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const sinon_1 = __importDefault(require("sinon"));
const ProgramExecution_1 = __importDefault(require("../models/ProgramExecution"));
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
describe("get exercises-to-do route", () => {
    let stubedUserModel;
    beforeEach(() => {
        stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
    });
    it("responds with an unauthorized error", async () => {
        const response = await supertest_1.default(app_1.default).get("/program-exec/exercises-to-do");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should response with an invalid date error", async () => {
        const response = await supertest_1.default(app_1.default)
            .get("/program-exec/exercises-to-do/not-a-date")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.body.data[0].value).equal("not-a-date");
        chai_1.expect(response.body.data[0].msg).equal("The parameter that provided is not a valid date");
    });
    it("should response with an invalid date error", async () => {
        const response = await supertest_1.default(app_1.default)
            .get("/program-exec/exercises-to-do/not-a-date")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.body.data[0].value).equal("not-a-date");
        chai_1.expect(response.body.data[0].msg).equal("The parameter that provided is not a valid date");
    });
    it("should pass from the validation middleware successfully 1", async () => {
        stubedUserModel.returns({ hasProgram: false });
        const response = await supertest_1.default(app_1.default)
            .get("/program-exec/exercises-to-do/11-11-2001")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.text).equal("You need to create a full program before you declare about execution");
        chai_1.expect(response.statusCode).equal(403);
    });
    it("should pass from the validation middleware successfully 2", async () => {
        stubedUserModel.returns({ hasProgram: false });
        const response = await supertest_1.default(app_1.default)
            .get("/program-exec/exercises-to-do")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.text).equal("You need to create a full program before you declare about execution");
        chai_1.expect(response.statusCode).equal(403);
    });
    after(async () => {
        app_1.default.close();
        mongoose_1.default.disconnect();
    });
    afterEach(() => {
        stubedUserModel.restore();
    });
});
describe("post declareAnExecution route", () => {
    let stubedUserModel;
    before(() => {
        stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
    });
    it("responds with an unauthorized error", async () => {
        const response = await supertest_1.default(app_1.default).post("/program-exec/11-11-2001");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send an error response for invalid date and exercises", async () => {
        const jsonData = JSON.stringify({
            exercises: { name1: "not a boolean", name2: true },
        });
        const response = await supertest_1.default(app_1.default)
            .post("/program-exec/not-a-date")
            .set("Content-type", "application/json")
            .set("Cookie", [`jon=${token}`])
            .send(jsonData);
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.body.data[0].value).equal("not-a-date");
        chai_1.expect(response.body.data[0].msg).equal("The parameter that provided is not a valid date");
        chai_1.expect(response.body.data[1].value).eql({
            name1: "not a boolean",
            name2: true,
        });
        chai_1.expect(response.body.data[1].msg).equal("Each exercise need to have a boolean value");
    });
    it("should move from the validation middleware successfully", async () => {
        stubedUserModel.returns({ hasProgram: false });
        const jsonData = JSON.stringify({
            exercises: { name1: false, name2: true },
        });
        const response = await supertest_1.default(app_1.default)
            .post("/program-exec/11-11-2001")
            .set("Content-type", "application/json")
            .set("Cookie", [`jon=${token}`])
            .send(jsonData);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("You need to create a full program before you declare about execution");
    });
    it("should move from the validation middleware successfully (with no date)", async () => {
        stubedUserModel.returns({ hasProgram: false });
        const jsonData = JSON.stringify({
            exercises: { name1: false, name2: true },
        });
        const response = await supertest_1.default(app_1.default)
            .post("/program-exec")
            .set("Content-type", "application/json")
            .set("Cookie", [`jon=${token}`])
            .send(jsonData);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("You need to create a full program before you declare about execution");
    });
    after(async () => {
        app_1.default.close();
        mongoose_1.default.disconnect();
        stubedUserModel.restore();
    });
});
describe("get SingleExecution route", () => {
    let stubedProgramExecModel;
    before(() => {
        stubedProgramExecModel = sinon_1.default.stub(ProgramExecution_1.default, "findOne");
    });
    it("responds with an unauthorized error", async () => {
        const response = await supertest_1.default(app_1.default).get("/program-exec/11-11-2001");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send an error response for invalid Date", async () => {
        const response = await supertest_1.default(app_1.default)
            .get("/program-exec/not-a-date")
            .set("Cookie", ["jon=" + token]);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.data[0].msg).equal("This date is invalid");
        chai_1.expect(response.body.data[0].value).equal("not-a-date");
    });
    it("should move from validation middleware successfully", async () => {
        stubedProgramExecModel.returns({ executions: [] });
        const response = await supertest_1.default(app_1.default)
            .get("/program-exec/11-11-2001")
            .set("Cookie", ["jon=" + token]);
        chai_1.expect(response.text).equal("User doesn't has any declared executions");
        chai_1.expect(response.statusCode).equal(403);
    });
    after(async () => {
        app_1.default.close();
        mongoose_1.default.disconnect();
        stubedProgramExecModel.restore();
    });
});
describe("get ExecutionsByRange route", () => {
    let stubedUserModel;
    before(() => {
        stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
    });
    it("responds with an unauthorized error", async () => {
        const response = await supertest_1.default(app_1.default).get("/program-exec/by-range");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send an error response if range and date are invalid", async () => {
        const response = await supertest_1.default(app_1.default)
            .get("/program-exec/by-range/not-valid/not-valid")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.data[0].msg).equal("a range can only be a week, a month, a year or all");
        chai_1.expect(response.body.data[0].value).equal("not-valid");
        chai_1.expect(response.body.data[1].msg).equal("date is invalid");
        chai_1.expect(response.body.data[1].value).equal("not-valid");
    });
    it("should move from validation middleware successfully ", async () => {
        stubedUserModel.returns({ hasProgram: false });
        const response = await supertest_1.default(app_1.default)
            .get("/program-exec/by-range/year/11-11-2001")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.text).equal("This user doesn't has a full program yet");
        chai_1.expect(response.statusCode).equal(403);
    });
    after(async () => {
        app_1.default.close();
        mongoose_1.default.disconnect();
        stubedUserModel.restore();
    });
});
