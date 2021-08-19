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
describe("getExercisesByDate endpoint test", () => {
    const res = responseDefaultObj_1.default();
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
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("You need to create a full program before you declare about execution");
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
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).equal("This is a rest day, You have no exercises to complete!");
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
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).equal("This is a rest day, You have no exercises to complete!");
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
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj.exercises).eql(["name1", "name2"]);
    });
    afterEach(() => {
        stubedProgramModel.restore();
        stubedUserModel.restore();
        stubedWorkoutModel.restore();
    });
});
