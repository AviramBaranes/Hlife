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
const programController = __importStar(require("../controller/program"));
const responseDefaultObj_1 = __importDefault(require("../utils/helpers/forTests/responseDefaultObj"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Program_1 = __importDefault(require("../models/Program"));
const User_1 = __importDefault(require("../models/User"));
const Goals_1 = __importDefault(require("../models/Goals"));
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
describe("get program recommendation endpoint test ", () => {
    const req = { userId: "123" };
    const res = responseDefaultObj_1.default();
    let stubedUserModel, stubedGoalsModel, stubedStatsModel;
    beforeEach(() => {
        stubedGoalsModel = sinon_1.default.stub(Goals_1.default, "findOne");
        stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, "findOne");
    });
    afterEach(() => {
        stubedGoalsModel.restore();
        stubedUserModel.restore();
        stubedStatsModel.restore();
    });
    it("should send an error response if no basic goal was defined", async () => {
        stubedGoalsModel.returns({ basicGoal: false });
        await programController.getRecommendationProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("User need to create goals in order to get a recommendation program");
    });
    it("should send the correct recommendation (female gain muscle pro)", async () => {
        stubedUserModel.returns({ gender: "female" });
        stubedGoalsModel.returns({ basicGoal: "increase muscles mass" });
        stubedStatsModel.returns({ rank: "Pro" });
        await programController.getRecommendationProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj[0]).eql({ workoutName: "AB", timesPerWeek: 4 });
    });
    it("should send the correct recommendation (female gain muscle)", async () => {
        stubedUserModel.returns({ gender: "female" });
        stubedGoalsModel.returns({ basicGoal: "increase muscles mass" });
        stubedStatsModel.returns({ rank: "Intermediate" });
        await programController.getRecommendationProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj[0]).eql({ workoutName: "FB", timesPerWeek: 2 });
    });
    it("should send the correct recommendation (female lose fat pro)", async () => {
        stubedUserModel.returns({ gender: "female" });
        stubedGoalsModel.returns({ basicGoal: "lose fat" });
        stubedStatsModel.returns({ rank: "Pro" });
        await programController.getRecommendationProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj[0]).eql({ workoutName: "aerobic", timesPerWeek: 4 });
        chai_1.expect(res.jsonObj[1]).eql({ workoutName: "FB", timesPerWeek: 1 });
    });
    it("should send the correct recommendation (female lose fat)", async () => {
        stubedUserModel.returns({ gender: "female" });
        stubedGoalsModel.returns({ basicGoal: "lose fat" });
        stubedStatsModel.returns({ rank: "Advanced" });
        await programController.getRecommendationProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj[0]).eql({ workoutName: "aerobic", timesPerWeek: 4 });
    });
    it("should send the correct recommendation (male lose fat pro)", async () => {
        stubedUserModel.returns({ gender: "male" });
        stubedGoalsModel.returns({ basicGoal: "lose fat" });
        stubedStatsModel.returns({ rank: "Pro" });
        await programController.getRecommendationProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj[0]).eql({ workoutName: "aerobic", timesPerWeek: 4 });
        chai_1.expect(res.jsonObj[1]).eql({ workoutName: "FB", timesPerWeek: 1 });
    });
    it("should send the correct recommendation (male lose fat)", async () => {
        stubedUserModel.returns({ gender: "male" });
        stubedGoalsModel.returns({ basicGoal: "lose fat" });
        stubedStatsModel.returns({ rank: "Beginner" });
        await programController.getRecommendationProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj[0]).eql({ workoutName: "aerobic", timesPerWeek: 2 });
    });
    it("should send the correct recommendation (male gain muscle)", async () => {
        stubedUserModel.returns({ gender: "male" });
        stubedGoalsModel.returns({ basicGoal: "increase muscles mass" });
        stubedStatsModel.returns({ rank: "Pro" });
        await programController.getRecommendationProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj[0]).eql({ workoutName: "ABCD", timesPerWeek: 4 });
    });
});
describe("create program endpoint test", () => {
    const res = responseDefaultObj_1.default();
    const req = {
        userId: "61196b0a38af7615d0aed56e",
        body: { trainingDayName: "A" },
        params: { day: "Sunday" },
    };
    let stubedWorkoutModel;
    let stubedProgramModel;
    beforeEach(() => {
        stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, "findOne");
        stubedProgramModel = sinon_1.default.stub(Program_1.default, "findOne");
    });
    it("Should send error response if workout was not found", async () => {
        stubedWorkoutModel.returns(false);
        await programController.createProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Couldn't find a workout with this name, make sure you create one first");
    });
    it("should create new program model with a list of all days + a rest day", async () => {
        stubedProgramModel.returns({ program: [], save: sinon_1.default.spy() });
        stubedWorkoutModel.returns(false);
        delete req.body.trainingDayName;
        await programController.createProgram(req, res, () => { });
        const program = await Program_1.default.findOne();
        chai_1.expect(program.save.called).equal(true);
        chai_1.expect(program.program[0].day).equal("Sunday");
        chai_1.expect(program.program[0].restDay).equal(true);
        chai_1.expect(program.program[1].day).equal("Monday");
        chai_1.expect(program.program).length(7);
    });
    it("should create new program model with a list of all days + a workout day", async () => {
        stubedProgramModel.returns({ program: [], save: sinon_1.default.spy() });
        stubedWorkoutModel.returns({ _id: "51196b0a38af7615d0aed56e" });
        req.body.trainingDayName = "A";
        await programController.createProgram(req, res, () => { });
        const program = await Program_1.default.findOne();
        chai_1.expect(program.save.called).equal(true);
        chai_1.expect(program.program[0].day).equal("Sunday");
        chai_1.expect(program.program[0].workout.toString()).equal("51196b0a38af7615d0aed56e");
        chai_1.expect(program.program[1].day).equal("Monday");
        chai_1.expect(program.program).length(7);
    });
    it("should send a success response", () => {
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Program added successfully");
    });
    it("should send an error response if day already has a program (restDay)", async () => {
        stubedProgramModel.returns({
            program: [{ day: "Sunday", restDay: true }, { day: "Monday" }],
        });
        stubedWorkoutModel.returns(false);
        delete req.body.trainingDayName;
        await programController.createProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("This day already has a program");
    });
    it("should send an error response if day already has a program (workout)", async () => {
        stubedProgramModel.returns({
            program: [{ day: "Sunday", workout: "id" }, { day: "Monday" }],
        });
        stubedWorkoutModel.returns(false);
        delete req.body.trainingDayName;
        await programController.createProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("This day already has a program");
    });
    it("should create new program day with a workout", async () => {
        req.body.trainingDayName = "A";
        stubedProgramModel.returns({
            save: sinon_1.default.spy(),
            program: [{ day: "Sunday" }, { day: "Monday" }],
        });
        stubedWorkoutModel.returns({ _id: "51196b0a38af7615d0aed56e" });
        await programController.createProgram(req, res, () => { });
        const program = await Program_1.default.findOne();
        chai_1.expect(program.save.called).equal(true);
        chai_1.expect(program.program[0].workout.toString()).equal("51196b0a38af7615d0aed56e");
        chai_1.expect(program.program[0].restDay).equal(false);
    });
    it("should create new program day with a restDay", async () => {
        req.params.day = "Monday";
        delete req.body.trainingDayName;
        stubedProgramModel.returns({
            save: sinon_1.default.spy(),
            program: [{ day: "Sunday" }, { day: "Monday" }],
        });
        await programController.createProgram(req, res, () => { });
        const program = await Program_1.default.findOne();
        chai_1.expect(program.save.called).equal(true);
        chai_1.expect(program.program[1].workout).equal(undefined);
        chai_1.expect(program.program[1].restDay).equal(true);
    });
    it("should send a success response", () => {
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Program added successfully");
    });
    it("should update user if program is full", async () => {
        req.params.day = "Sunday";
        stubedProgramModel.returns({
            save: sinon_1.default.spy(),
            program: [
                { day: "Sunday" },
                { day: "2", restDay: true },
                { day: "3", restDay: true },
                { day: "4", restDay: true },
                { day: "5", restDay: true },
                { day: "6", restDay: true },
                { day: "7", restDay: true },
            ],
        });
        const stubedUser = sinon_1.default.stub(User_1.default, "findById");
        stubedUser.returns({ hasProgram: false, save: sinon_1.default.spy() });
        await programController.createProgram(req, res, () => { });
        const user = User_1.default.findById({});
        chai_1.expect(user.save.called).equal(true);
        chai_1.expect(user.hasProgram).equal(true);
        stubedUser.restore();
    });
    afterEach(() => {
        stubedWorkoutModel.restore();
        stubedProgramModel.restore();
    });
});
describe("get all programs endpoint test", () => {
    const req = { userId: "123" };
    const res = responseDefaultObj_1.default();
    let stubedProgramModel;
    beforeEach(() => {
        stubedProgramModel = sinon_1.default.stub(Program_1.default, "findOne");
    });
    it("should send an error response if no program was found", async () => {
        stubedProgramModel.returns(false);
        await programController.getAllPrograms(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Something wrong... this user has no program");
    });
    it("should send an error response if program is not full", async () => {
        stubedProgramModel.returns({ program: [{ day: "a" }, { day: "b" }] });
        await programController.getAllPrograms(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("You need to create a program for each day in order to request them");
    });
    it("should send a success response with the full program", async () => {
        stubedProgramModel.returns({
            program: [
                { day: "a", restDay: true },
                { restDay: false, workout: "id", day: "b" },
            ],
        });
        await programController.getAllPrograms(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj[0]).eql({ day: "a", restDay: true });
        chai_1.expect(res.jsonObj[1]).eql({ restDay: false, workout: "id", day: "b" });
    });
    afterEach(() => {
        stubedProgramModel.restore();
    });
});
describe("get program endpoint test", () => {
    const res = responseDefaultObj_1.default();
    const req = {
        userId: "61196b0a38af7615d0aed56e",
        params: { day: "Sunday" },
    };
    let stubedProgramModel;
    beforeEach(() => {
        stubedProgramModel = sinon_1.default.stub(Program_1.default, "findOne");
    });
    it("Should send an error response if workout was not found", async () => {
        stubedProgramModel.returns({ program: [] });
        await programController.getProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("No program was found for the user");
    });
    it("should send an error response if there is no program as made yet", async () => {
        stubedProgramModel.returns({ program: [{ day: "Sunday" }] });
        await programController.getProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("No program was set at this day yet, make sure you create one");
    });
    it("should send a success response with the requested program", async () => {
        stubedProgramModel.returns({
            program: [
                { day: "no" },
                { day: "Sunday", restDay: false, workout: "_id" },
            ],
        });
        await programController.getProgram(req, res, () => { });
        const expectedResponseData = {
            day: "Sunday",
            restDay: false,
            workout: "_id",
        };
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj).eql(expectedResponseData);
    });
    afterEach(() => {
        stubedProgramModel.restore();
    });
});
describe("change program endpoint test", () => {
    const res = responseDefaultObj_1.default();
    const req = {
        userId: "61196b0a38af7615d0aed56e",
        body: { trainingDayName: "A", restDay: true },
        params: { day: "Sunday" },
    };
    let stubedProgramModel;
    let stubedWorkoutModel;
    beforeEach(() => {
        stubedProgramModel = sinon_1.default.stub(Program_1.default, "findOne");
        stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, "findOne");
    });
    it("Should send an error response if the request contains a rest day and a workout", async () => {
        stubedProgramModel.returns(false);
        await programController.changeProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("You can't set a workout day as a rest day");
    });
    it("Should send an error response if program was not found", async () => {
        req.body.restDay = false;
        stubedProgramModel.returns(false);
        await programController.changeProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("No program was found for the user");
    });
    it("should send an error response if there is no program as made yet", async () => {
        stubedProgramModel.returns({ program: [{ day: "Sunday" }] });
        await programController.changeProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("No program was set at this day yet, make sure you create one");
    });
    it("Should send error response if workout was not found", async () => {
        stubedWorkoutModel.returns(false);
        stubedProgramModel.returns({ program: [{ day: "Sunday", restDay: true }] });
        await programController.changeProgram(req, res, () => { });
        chai_1.expect(res.statusCode).equal(403);
        chai_1.expect(res.msg).equal("Couldn't find a workout with this name, make sure you create one first");
    });
    it("Should set a new workout", async () => {
        stubedWorkoutModel.returns({ _id: "61196b0a38af7615d0aed56e" });
        stubedProgramModel.returns({
            save: sinon_1.default.spy(),
            program: [{ day: "Sunday", restDay: true }],
        });
        await programController.changeProgram(req, res, () => { });
        const program = await Program_1.default.findOne();
        const testingProgram = program.program[0];
        chai_1.expect(testingProgram.workout.toString()).equal("61196b0a38af7615d0aed56e");
        chai_1.expect(testingProgram.restDay).equal(false);
        chai_1.expect(program.save.called).equal(true);
    });
    it("should delete the workout if rest day is true", async () => {
        req.body.restDay = true;
        delete req.body.trainingDayName;
        stubedProgramModel.returns({
            save: sinon_1.default.spy(),
            program: [{ day: "Sunday", workout: "exist" }],
        });
        await programController.changeProgram(req, res, () => { });
        const program = await Program_1.default.findOne();
        const testingProgram = program.program[0];
        chai_1.expect(testingProgram.workout).equal(undefined);
        chai_1.expect(testingProgram.restDay).equal(true);
        chai_1.expect(program.save.called).equal(true);
    });
    it("should set a success response", () => {
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Program updated successfully");
    });
    afterEach(() => {
        stubedProgramModel.restore();
        stubedWorkoutModel.restore();
    });
});
