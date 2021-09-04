"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../app"));
const User_1 = __importDefault(require("../models/User"));
const sinon_1 = __importDefault(require("sinon"));
const Workout_1 = __importDefault(require("../models/Workout"));
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
describe("post workout route", () => {
    it("should send an error response if unauthorized", async () => {
        const response = await supertest_1.default(app_1.default).post("/workout");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send an error response for failing validation ", async () => {
        const payload = JSON.stringify({
            trainingDayName: "W",
            name: "1-",
            description: "too-short",
            exercises: [
                { muscles: ["Claves"], sets: 2, reps: 2 },
                { muscles: ["invalid"], sets: 10, reps: 51 },
            ],
            time: 1,
        });
        const response = await supertest_1.default(app_1.default)
            .post("/workout")
            .set("Cookie", [`jon=${token}`])
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.body.data[0].value).equal("W");
        chai_1.expect(response.body.data[0].msg).equal("Invalid training day name");
        chai_1.expect(response.body.data[1].value).equal("1-");
        chai_1.expect(response.body.data[1].msg).equal("Name can contain only letters");
        chai_1.expect(response.body.data[2].msg).equal("Name must be at least 3 letters");
        chai_1.expect(response.body.data[3].value).equal("too-short");
        chai_1.expect(response.body.data[3].msg).equal("Description too short");
        chai_1.expect(response.body.data[4].msg).equal("Exercises are invalid");
        chai_1.expect(response.body.data[5].value).equal(1);
        chai_1.expect(response.body.data[5].msg).equal("Time is invalid");
    });
    it("should move from validation middleware successfully", async () => {
        const stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
        stubedUserModel.returns({ workouts: [{ name: "name" }] });
        const payload = JSON.stringify({
            trainingDayName: "A",
            name: "name",
            description: "this is a description",
            exercises: [
                { muscles: ["Claves"], sets: 2, reps: 2 },
                { muscles: ["Abs"], sets: 1, reps: 5 },
            ],
            time: 20,
        });
        const response = await supertest_1.default(app_1.default)
            .post("/workout")
            .set("Cookie", [`jon=${token}`])
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("Each workout need to have a unique name");
        stubedUserModel.restore();
    });
});
describe("get workout by name route", () => {
    it("should send an error response if unauthorized", async () => {
        const response = await supertest_1.default(app_1.default).get("/workout/?trainingDay=W");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send an error response for failing validation ", async () => {
        const response = await supertest_1.default(app_1.default)
            .get("/workout/?trainingDayName=W")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.body.data[0].value).equal("W");
        chai_1.expect(response.body.data[0].msg).equal("Invalid training day name");
    });
    it("should move from validation middleware successfully", async () => {
        const stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, "findOne");
        stubedWorkoutModel.returns(false);
        const response = await supertest_1.default(app_1.default)
            .get("/workout/?trainingDayName=A")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("couldn't find workout, make sure you create a workout with this name first.");
        stubedWorkoutModel.restore();
    });
});
describe("get workout by id route", () => {
    it("should send an error response if unauthorized", async () => {
        const response = await supertest_1.default(app_1.default).get("/workout/id");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should move from validation middleware successfully", async () => {
        const stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, "findById");
        stubedWorkoutModel.returns(false);
        const response = await supertest_1.default(app_1.default)
            .get("/workout/id")
            .set("Cookie", [`jon=${token}`]);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("No workout with this id");
        stubedWorkoutModel.restore();
    });
});
describe("change workout route", () => {
    it("should send an error response if unauthorized", async () => {
        const response = await supertest_1.default(app_1.default).put("/workout");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send an error response for failing validation ", async () => {
        const payload = JSON.stringify({
            trainingDayName: "W",
            name: "1-",
            description: "too-short",
            exercises: [
                { muscles: ["Claves"], sets: 2, reps: 2 },
                { muscles: ["invalid"], sets: 10, reps: 51 },
            ],
            time: 1,
        });
        const response = await supertest_1.default(app_1.default)
            .put("/workout")
            .set("Cookie", [`jon=${token}`])
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.body.data[0].value).equal("W");
        chai_1.expect(response.body.data[0].msg).equal("Invalid training day name");
        chai_1.expect(response.body.data[1].value).equal("1-");
        chai_1.expect(response.body.data[1].msg).equal("Name can contain only letters");
        chai_1.expect(response.body.data[2].msg).equal("Name must be at least 3 letters");
        chai_1.expect(response.body.data[3].value).equal("too-short");
        chai_1.expect(response.body.data[3].msg).equal("Description too short");
        chai_1.expect(response.body.data[4].msg).equal("Exercises are invalid");
        chai_1.expect(response.body.data[5].value).equal(1);
        chai_1.expect(response.body.data[5].msg).equal("Time is invalid");
    });
    it("should move from validation middleware successfully", async () => {
        const stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, "findOne");
        stubedWorkoutModel.returns(false);
        const payload = JSON.stringify({
            trainingDayName: "A",
            name: "name",
            description: "this is a description",
            exercises: [
                { muscles: ["Claves"], sets: 2, reps: 2 },
                { muscles: ["Abs"], sets: 1, reps: 5 },
            ],
            time: 20,
        });
        const response = await supertest_1.default(app_1.default)
            .put("/workout")
            .set("Cookie", [`jon=${token}`])
            .set("Content-type", "application/json")
            .send(payload);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("couldn't find workout, make sure you create a workout with this name first.");
        stubedWorkoutModel.restore();
    });
});
describe("delete workout route", () => {
    it("should send an error response if unauthorized", async () => {
        const response = await supertest_1.default(app_1.default).delete("/workout/trainingDayName");
        chai_1.expect(response.statusCode).equal(401);
        chai_1.expect(response.body.message).equal("Unauthorized cookie is invalid");
    });
    it("should send an error response for failing validation ", async () => {
        const response = await supertest_1.default(app_1.default)
            .delete("/workout/W")
            .set("Cookie", [`jon=${token}`])
            .send(payload);
        chai_1.expect(response.statusCode).equal(422);
        chai_1.expect(response.body.message).equal("Validation Failed");
        chai_1.expect(response.body.data[0].value).equal("W");
        chai_1.expect(response.body.data[0].msg).equal("Invalid training day name");
    });
    it("should move from validation middleware successfully", async () => {
        const stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, "findOneAndDelete");
        stubedWorkoutModel.returns(false);
        const response = await supertest_1.default(app_1.default)
            .delete("/workout/A")
            .set("Cookie", [`jon=${token}`])
            .send(payload);
        chai_1.expect(response.statusCode).equal(403);
        chai_1.expect(response.text).equal("couldn't find workout, make sure you create a workout with this name first.");
        stubedWorkoutModel.restore();
    });
});
