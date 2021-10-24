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
const programExecutionController = __importStar(require("../controller/programExecution"));
const responseDefaultObj_1 = __importDefault(require("../utils/helpers/forTests/responseDefaultObj"));
const Workout_1 = __importDefault(require("../models/Workout"));
const User_1 = __importDefault(require("../models/User"));
const Program_1 = __importDefault(require("../models/Program"));
const ProgramExecution_1 = __importDefault(require("../models/ProgramExecution"));
describe("getExercisesByDate endpoint test", () => {
    const res = (0, responseDefaultObj_1.default)();
    const req = {
        userId: "61196b0a38af7615d0aed56e",
        params: {},
    };
    let stubedWorkoutModel;
    let stubedProgramModel;
    let stubedUserModel;
    beforeEach(() => {
        stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, "findById");
        stubedProgramModel = sinon_1.default.stub(Program_1.default, "findOne");
        stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
    });
    it("should send an error response if user does not have a full program", async () => {
        stubedUserModel.returns({ hasProgram: false });
        await programExecutionController.getExercisesByDate(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("You need to create a full program before you declare about execution");
    });
    it("should send a success response if this day is rest day (no date in params)", async () => {
        // I needed to make sure that program returns an array of objects,
        // and that one of the object is with a day that equal to today (whenever the test runs) and one that is not today
        const day = new Date();
        const nextDay = new Date();
        nextDay.setDate(day.getDate() + 1);
        const today = new Intl.DateTimeFormat("en-Us", { weekday: "long" }).format(day);
        const tomorrow = new Intl.DateTimeFormat("en-Us", {
            weekday: "long",
        }).format(nextDay);
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramModel.returns({
            program: [
                { day: today, restDay: true },
                { day: tomorrow, restDay: false },
            ],
        });
        await programExecutionController.getExercisesByDate(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.msg).equal("This is a rest day, You have no exercises to complete!");
    });
    it("should send a success response if this day is rest day (date in params)", async () => {
        req.params.date = new Date("2021-08-15"); //A random sunday
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramModel.returns({
            program: [
                { day: "Sunday", restDay: true },
                { day: "Monday", restDay: false },
            ],
        });
        await programExecutionController.getExercisesByDate(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.msg).equal("This is a rest day, You have no exercises to complete!");
    });
    it("should send a success response with the exercises", async () => {
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramModel.returns({
            program: [
                { day: "Sunday", restDay: false },
                { day: "Monday", restDay: false },
            ],
        });
        stubedWorkoutModel.returns({
            exercises: [
                { name: "name1", data: "data1" },
                { name: "name2", data: "data2" },
            ],
        });
        await programExecutionController.getExercisesByDate(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj.exercises).eql(["name1", "name2"]);
    });
    afterEach(() => {
        stubedProgramModel.restore();
        stubedUserModel.restore();
        stubedWorkoutModel.restore();
    });
});
describe("declareAnExecution endpoint test", () => {
    const res = (0, responseDefaultObj_1.default)();
    const req = {
        userId: "61196b0a38af7615d0aed56e",
        params: {},
        body: {},
    };
    let stubedWorkoutModel;
    let stubedProgramModel;
    let stubedUserModel;
    let stubedProgramExecutionModel;
    beforeEach(() => {
        stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, "findById");
        stubedProgramModel = sinon_1.default.stub(Program_1.default, "findOne");
        stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
        stubedProgramExecutionModel = sinon_1.default.stub(ProgramExecution_1.default, "findOne");
    });
    it("should send an error response if user does not have a full program", async () => {
        stubedUserModel.returns({ hasProgram: false });
        await programExecutionController.declareAnExecution(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("You need to create a full program before you declare about execution");
    });
    it("should send a success response and update the model if this day is rest day (no date in params)", async () => {
        // I needed to make sure that program returns an array of objects,
        // and that one of the object is with a day that equal to today (whenever the test runs) and one that is not today
        const day = new Date();
        const nextDay = new Date();
        nextDay.setDate(day.getDate() + 1);
        const today = new Intl.DateTimeFormat("en-Us", { weekday: "long" }).format(day);
        const tomorrow = new Intl.DateTimeFormat("en-Us", {
            weekday: "long",
        }).format(nextDay);
        stubedUserModel.returns({ hasProgram: true, grade: 5, save: sinon_1.default.spy() });
        stubedProgramModel.returns({
            program: [
                { day: today, restDay: true, _id: "61196b0a38af7615d0aed56f" },
                { day: tomorrow, restDay: false },
            ],
        });
        stubedProgramExecutionModel.returns({ executions: [], save: sinon_1.default.spy() });
        await programExecutionController.declareAnExecution(req, res, () => { });
        const programExecution = await ProgramExecution_1.default.findOne();
        const user = await User_1.default.findById({});
        (0, chai_1.expect)(programExecution.executions[0].programId).equal("61196b0a38af7615d0aed56f");
        (0, chai_1.expect)(programExecution.executions[0].date.getTime()).to.be.closeTo(day.getTime(), 2);
        (0, chai_1.expect)(programExecution.executions[0].executionRate).equal(100);
        (0, chai_1.expect)(programExecution.executions[0].grade).equal(10);
        (0, chai_1.expect)(programExecution.save.called).equal(true);
        (0, chai_1.expect)(user.grade).equal(15);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(res.msg).equal("Wonderful! Your execution has been declared");
    });
    it("should send a success response if this day is rest day (date in params)", async () => {
        req.params.date = new Date("2021-08-15"); //A random sunday
        stubedUserModel.returns({ hasProgram: true, grade: 5, save: sinon_1.default.spy() });
        stubedProgramModel.returns({
            program: [
                { day: "Sunday", restDay: true, _id: "61196b0a38af7615d0aed56f" },
                { day: "Monday", restDay: false },
            ],
        });
        stubedProgramExecutionModel.returns({ executions: [], save: sinon_1.default.spy() });
        await programExecutionController.declareAnExecution(req, res, () => { });
        const programExecution = await ProgramExecution_1.default.findOne();
        const user = await User_1.default.findById({});
        (0, chai_1.expect)(programExecution.executions[0].programId).equal("61196b0a38af7615d0aed56f");
        (0, chai_1.expect)(programExecution.executions[0].date).equal(req.params.date);
        (0, chai_1.expect)(programExecution.executions[0].executionRate).equal(100);
        (0, chai_1.expect)(programExecution.executions[0].grade).equal(10);
        (0, chai_1.expect)(programExecution.save.called).equal(true);
        (0, chai_1.expect)(user.grade).equal(15);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(res.msg).equal("Wonderful! Your execution has been declared");
    });
    it("should add an execution of 100%", async () => {
        req.body.exercises = { exercise1: true, exercise2: true, exercise3: true };
        stubedUserModel.returns({ hasProgram: true, grade: 5, save: sinon_1.default.spy() });
        stubedProgramModel.returns({
            program: [
                { day: "Sunday", restDay: false, _id: "61196b0a38af7615d0aed56f" },
                { day: "Monday", restDay: false },
            ],
        });
        stubedProgramExecutionModel.returns({ executions: [], save: sinon_1.default.spy() });
        await programExecutionController.declareAnExecution(req, res, () => { });
        const programExecution = await ProgramExecution_1.default.findOne();
        const user = await User_1.default.findById({});
        (0, chai_1.expect)(programExecution.executions[0].programId).equal("61196b0a38af7615d0aed56f");
        (0, chai_1.expect)(programExecution.executions[0].date).equal(req.params.date);
        (0, chai_1.expect)(programExecution.executions[0].executionRate).equal(100);
        (0, chai_1.expect)(programExecution.executions[0].grade).equal(10);
        (0, chai_1.expect)(programExecution.save.called).equal(true);
        (0, chai_1.expect)(user.grade).equal(15);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(res.msg).equal("Wonderful! Your execution has been declared");
    });
    it("should add an execution of 75%", async () => {
        req.body.exercises = {
            exercise1: true,
            exercise2: true,
            exercise3: true,
            exercise4: false,
        };
        stubedUserModel.returns({ hasProgram: true, grade: 5, save: sinon_1.default.spy() });
        stubedProgramModel.returns({
            program: [
                { day: "Sunday", restDay: false, _id: "61196b0a38af7615d0aed56f" },
                { day: "Monday", restDay: false },
            ],
        });
        stubedProgramExecutionModel.returns({ executions: [], save: sinon_1.default.spy() });
        await programExecutionController.declareAnExecution(req, res, () => { });
        const programExecution = await ProgramExecution_1.default.findOne();
        const user = await User_1.default.findById({});
        (0, chai_1.expect)(programExecution.executions[0].programId).equal("61196b0a38af7615d0aed56f");
        (0, chai_1.expect)(programExecution.executions[0].date).equal(req.params.date);
        (0, chai_1.expect)(programExecution.executions[0].executionRate).equal(75);
        (0, chai_1.expect)(programExecution.executions[0].grade).equal(8);
        (0, chai_1.expect)(programExecution.save.called).equal(true);
        (0, chai_1.expect)(user.grade).equal(13);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(res.msg).equal("Wonderful! Your execution has been declared");
    });
    afterEach(() => {
        stubedProgramModel.restore();
        stubedUserModel.restore();
        stubedProgramExecutionModel.restore();
        stubedWorkoutModel.restore();
    });
});
describe("getSingleExecution endpoint tests", () => {
    const date = new Date().toISOString();
    const req = {
        userId: "61196b0a38af7615d0aed56e",
        params: { date },
    };
    const res = (0, responseDefaultObj_1.default)();
    let stubedProgramExecutionModel;
    beforeEach(() => {
        stubedProgramExecutionModel = sinon_1.default.stub(ProgramExecution_1.default, "findOne");
    });
    it("should send an error response if programExecution is empty", async () => {
        stubedProgramExecutionModel.returns({ executions: [] });
        await programExecutionController.getSingleExecution(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("User doesn't has any declared executions");
    });
    it("should send an error response if programExecution was not found on this date", async () => {
        stubedProgramExecutionModel.returns({
            executions: [{ date: new Date() }],
        });
        await programExecutionController.getSingleExecution(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("No execution was found at this date");
    });
    it("should send a success response with the requested execution", async () => {
        const currentDate = new Date(date);
        stubedProgramExecutionModel.returns({
            executions: [{ date: new Date() }, { date: currentDate, data: "data" }],
        });
        await programExecutionController.getSingleExecution(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj).eql({ date: currentDate, data: "data" });
    });
    afterEach(() => {
        stubedProgramExecutionModel.restore();
    });
});
describe("getExecutionsByRange endpoint tests", () => {
    const date = new Date(2021, 0, 1, 0, 0, 0).toISOString(); //(01.01.2021)
    const req = {
        userId: "61196b0a38af7615d0aed56e",
        body: { date: new Date(date), range: "week" },
    };
    const res = (0, responseDefaultObj_1.default)();
    let stubedProgramExecutionModel;
    let stubedUserModel;
    beforeEach(() => {
        stubedProgramExecutionModel = sinon_1.default.stub(ProgramExecution_1.default, "findOne");
        stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
    });
    it("should send an error response if user don't have a full program", async () => {
        stubedUserModel.returns({ hasProgram: false });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("This user doesn't has a full program yet");
    });
    it("should send an error response if no executions were found (week)", async () => {
        const dateNotInWeek = new Date(date);
        dateNotInWeek.setDate(8);
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramExecutionModel.returns({
            executions: [{ date: dateNotInWeek, data: "data" }],
        });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("No Executions were found in this dates");
    });
    it("should send a success response with the executions (week)", async () => {
        const dateNotInWeek = new Date(date);
        dateNotInWeek.setFullYear(2020);
        const dateInWeek = new Date(2021, 0, 2, 0, 0, 0);
        const anotherDateInWeek = new Date(2020, 11, 30);
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramExecutionModel.returns({
            executions: [
                { date: dateNotInWeek, data: "data" },
                { date: dateInWeek, data: "data2" },
                { date: anotherDateInWeek, data: "data3" },
            ],
        });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj[0].data).equal("data2");
        (0, chai_1.expect)(res.jsonObj[1].data).equal("data3");
    });
    it("should send an error response if no executions were found (month)", async () => {
        req.body.range = "month";
        const dateNotInWeek = new Date(date);
        dateNotInWeek.setMonth(2);
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramExecutionModel.returns({
            executions: [{ date: dateNotInWeek, data: "data" }],
        });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("No Executions were found in this dates");
    });
    it("should send a success response with the executions (month)", async () => {
        const dateNotInMonth = new Date(date);
        dateNotInMonth.setMonth(2);
        const dateInMonth = new Date(2021, 0, 20, 0, 0, 0);
        const AnotherDateInMonth = new Date(2021, 0, 25, 0, 0, 0);
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramExecutionModel.returns({
            executions: [
                { date: dateNotInMonth, data: "data" },
                { date: dateInMonth, data: "data2" },
                { date: AnotherDateInMonth, data: "data3" },
            ],
        });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj[0].data).equal("data2");
        (0, chai_1.expect)(res.jsonObj[1].data).equal("data3");
    });
    it("should send an error response if no executions were found (year)", async () => {
        req.body.range = "year";
        const dateNotInYear = new Date(date);
        dateNotInYear.setFullYear(2000);
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramExecutionModel.returns({
            executions: [{ date: dateNotInYear, data: "data" }],
        });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("No Executions were found in this dates");
    });
    it("should send a success response with the executions (year)", async () => {
        const dateNotInYear = new Date(date);
        dateNotInYear.setFullYear(2000);
        const dateInYear = new Date(2021, 10, 20, 0, 0, 0);
        const AnotherDateInYear = new Date(2021, 7, 25, 0, 0, 0);
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramExecutionModel.returns({
            executions: [
                { date: dateNotInYear, data: "data" },
                { date: dateInYear, data: "data2" },
                { date: AnotherDateInYear, data: "data3" },
            ],
        });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj[0].data).equal("data2");
        (0, chai_1.expect)(res.jsonObj[1].data).equal("data3");
    });
    it("should send an error response if no executions were found (all)", async () => {
        req.body.range = "all";
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramExecutionModel.returns({
            executions: [],
        });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("No Executions were found in this dates");
    });
    it("should send a success response with the executions (all)", async () => {
        stubedUserModel.returns({ hasProgram: true });
        stubedProgramExecutionModel.returns({
            executions: [
                { date: new Date(1990, 10, 10), data: "data" },
                { date: new Date(2001, 11, 11), data: "data2" },
                { date: new Date(2007, 3, 3), data: "data3" },
            ],
        });
        await programExecutionController.getExecutionsByRange(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj[0].data).equal("data");
        (0, chai_1.expect)(res.jsonObj[1].data).equal("data2");
        (0, chai_1.expect)(res.jsonObj[2].data).equal("data3");
    });
    afterEach(() => {
        stubedProgramExecutionModel.restore();
        stubedUserModel.restore();
    });
});
