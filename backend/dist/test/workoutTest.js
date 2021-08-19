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
const workoutController = __importStar(require("../controller/workout"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const responseDefaultObj_1 = __importDefault(require("../utils/helpers/forTests/responseDefaultObj"));
describe("create workout tests", () => {
    const res = responseDefaultObj_1.default();
    const req = { userId: "61196b0a38af7615d0aed56e", body: {} };
    let stubedUser;
    before(async () => {
        stubedUser = sinon_1.default.stub(User_1.default, "findById");
    });
    it("should return error response if name already taken", async () => {
        req.body.trainingDayName = "A";
        req.body.name = "chest";
        stubedUser.returns({
            workouts: [
                { name: "-", trainingDayName: "-" },
                { name: "chest", trainingDayName: "-" },
            ],
        });
        await workoutController.createWorkout(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("Each workout need to have a unique name");
    });
    it("should create a workout model", async () => {
        req.body.description = "description";
        req.body.exercises = [{ name: "name", sets: 1, reps: 1 }];
        const stubedWorkout = sinon_1.default.stub(Workout_1.default.prototype, "save");
        stubedUser.returns({ workouts: [{ name: "-", trainingDayName: "-" }] });
        await workoutController.createWorkout(req, res, () => { });
        const newWorkoutArgs = stubedWorkout.firstCall.thisValue;
        chai_1.expect(newWorkoutArgs.user).to.be.an("object");
        chai_1.expect(newWorkoutArgs.trainingDayName).equal("A");
        chai_1.expect(newWorkoutArgs.name).equal("chest");
        chai_1.expect(newWorkoutArgs.exercises[0].name).equal("name");
        chai_1.expect(newWorkoutArgs.exercises[0].sets).equal(1);
        chai_1.expect(newWorkoutArgs.exercises[0].reps).equal(1);
        chai_1.expect(newWorkoutArgs.description).equal("description");
    });
    it("should save user model with new workout", async () => {
        stubedUser.returns({
            workouts: [],
            save: sinon_1.default.spy(),
        });
        await workoutController.createWorkout(req, res, () => { });
        const user = await User_1.default.findById("-");
        const workouts = user.workouts;
        chai_1.expect(workouts[0].name).equal("chest");
        chai_1.expect(workouts[0].trainingDayName).equal("A");
        chai_1.expect(user.save.called).equal(true);
    });
    it("should return a success response", async () => {
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("A-workout created successfully");
    });
    after(() => {
        stubedUser.restore();
    });
});
describe("get workout by name tests", () => {
    const res = responseDefaultObj_1.default();
    const req = { userId: "61196b0a38af7615d0aed56e", query: {} };
    let stubedWorkout;
    before(async () => {
        stubedWorkout = sinon_1.default.stub(Workout_1.default, "findOne");
    });
    it("should return error response if workout was not found", async () => {
        stubedWorkout.returns(false);
        await workoutController.getWorkoutByName(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("couldn't find workout, make sure you create a workout with this name first.");
    });
    it("should return success response and the workout object", async () => {
        const workout = { _id: 1, name: "name", data: "data" };
        stubedWorkout.returns(workout);
        await workoutController.getWorkoutByName(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj).eql(workout);
    });
    after(() => {
        stubedWorkout.restore();
    });
});
describe("get workout by id test", () => {
    const req = { params: "id" };
    const res = responseDefaultObj_1.default();
    let stubedWorkout;
    beforeEach(() => {
        stubedWorkout = sinon_1.default.stub(Workout_1.default, "findById");
    });
    it("should send an error response if no workout was found", async () => {
        stubedWorkout.returns(false);
        await workoutController.getById(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("No workout with this id");
    });
    it("should send a success response with the workout object", async () => {
        const data = { id: "123", name: "name", data: "data" };
        stubedWorkout.returns(data);
        await workoutController.getById(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.jsonObj).eql(data);
    });
    afterEach(() => {
        stubedWorkout.restore();
    });
});
describe("change workout tests", () => {
    const res = responseDefaultObj_1.default();
    const req = { userId: "61196b0a38af7615d0aed56e", body: {} };
    let stubedWorkout;
    before(async () => {
        stubedWorkout = sinon_1.default.stub(Workout_1.default, "findOne");
    });
    it("should return error response if workout was not found", async () => {
        stubedWorkout.returns(false);
        await workoutController.changeWorkout(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("couldn't find workout, make sure you create a workout with this name first.");
    });
    it("should return error response if no data was provided", async () => {
        stubedWorkout.returns(true);
        await workoutController.changeWorkout(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("You need to provide data in order to change the workout");
    });
    it("should save the updated workout", async () => {
        stubedWorkout.returns({ save: sinon_1.default.spy() });
        req.body.name = "name";
        req.body.description = "description";
        req.body.exercises = "exercises";
        await workoutController.changeWorkout(req, res, () => { });
        const workout = await Workout_1.default.findOne();
        chai_1.expect(workout.save.called).equal(true);
        chai_1.expect(workout.name).equal("name");
        chai_1.expect(workout.description).equal("description");
        chai_1.expect(workout.exercises).equal("exercises");
    });
    it("should return success response", async () => {
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).eql("Workout changed successfully");
    });
    after(() => {
        stubedWorkout.restore();
    });
});
describe("delete workout tests", () => {
    const res = responseDefaultObj_1.default();
    const req = { userId: "61196b0a38af7615d0aed56e", params: {} };
    let stubedWorkout;
    before(async () => {
        stubedWorkout = sinon_1.default.stub(Workout_1.default, "findOneAndDelete");
    });
    it("should return error response if workout was not found", async () => {
        stubedWorkout.returns(false);
        await workoutController.deleteWorkout(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("couldn't find workout, make sure you create a workout with this name first.");
    });
    it("should return success response and the workout object", async () => {
        stubedWorkout.returns(true);
        await workoutController.deleteWorkout(req, res, () => { });
        chai_1.expect(res.statusCode).equal(200);
        chai_1.expect(res.msg).eql("Workout deleted successfully");
    });
    after(() => {
        stubedWorkout.restore();
    });
});
