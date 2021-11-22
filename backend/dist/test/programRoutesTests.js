"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sinon_1 = __importDefault(require("sinon"));
const app_1 = __importDefault(require("../app"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Program_1 = __importDefault(require("../models/Program"));
const Goals_1 = __importDefault(require("../models/Goals"));
const user = new User_1.default({
    name: '-',
    username: '-',
    email: '-',
    password: '-',
    gender: 'male',
    dateOfBirth: '01/01/2005',
});
const payload = { userId: user._id.toString() };
const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '2d',
});
describe('get program recommendation route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/program/recommendation');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedGoalsModel = sinon_1.default.stub(Goals_1.default, 'findOne');
        stubedGoalsModel.returns({ basicGoal: false });
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/program/recommendation')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('User need to create goals in order to get a recommendation program');
        stubedGoalsModel.restore();
    });
});
describe('post program route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).post('/program/day');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const payload = JSON.stringify({
            trainingDayName: 'W',
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/program/invalid-day')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal('invalid-day');
        (0, chai_1.expect)(response.body.data[0].msg).equal('Invalid day');
        (0, chai_1.expect)(response.body.data[1].value).equal('W');
        (0, chai_1.expect)(response.body.data[1].msg).equal('Training day is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedWorkoutModel = sinon_1.default.stub(Workout_1.default, 'findOne');
        stubedWorkoutModel.returns(false);
        const payload = JSON.stringify({
            trainingDayName: 'A',
            workoutName: 'name',
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/program/Sunday')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal("Couldn't find a workout with this name, make sure you create one first");
        stubedWorkoutModel.restore();
    });
});
describe('get program route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/program');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedProgramModel = sinon_1.default.stub(Program_1.default, 'findOne');
        stubedProgramModel.returns({
            populate() {
                return false;
            },
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/program')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('Something wrong... this user has no program');
        stubedProgramModel.restore();
    });
});
describe('get program by day route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/program/day');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/program/invalid-day')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal('invalid-day');
        (0, chai_1.expect)(response.body.data[0].msg).equal('Day is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedProgramModel = sinon_1.default.stub(Program_1.default, 'findOne');
        stubedProgramModel.returns({ program: [] });
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/program/Sunday')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('No program was found for the user');
        stubedProgramModel.restore();
    });
});
describe('post program route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).put('/program/day');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const payload = JSON.stringify({
            trainingDayName: 'W',
            restDay: 'not-a-boolean',
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/program/invalid-day')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal('invalid-day');
        (0, chai_1.expect)(response.body.data[0].msg).equal('Invalid day');
        (0, chai_1.expect)(response.body.data[1].value).equal('W');
        (0, chai_1.expect)(response.body.data[1].msg).equal('Training day is invalid');
        (0, chai_1.expect)(response.body.data[2].value).equal('not-a-boolean');
        (0, chai_1.expect)(response.body.data[2].msg).equal('rest day needs to be a boolean');
    });
    it('should move from validation middleware successfully', async () => {
        const payload = JSON.stringify({
            trainingDayName: 'A',
            restDay: true,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/program/Sunday')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal("You can't set a workout day as a rest day");
    });
    it('should move from validation middleware successfully (optional values are omitted)', async () => {
        const stubedProgramModel = sinon_1.default.stub(Program_1.default, 'findOne');
        stubedProgramModel.returns(false);
        const payload = JSON.stringify({
            restDay: true,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/program/Sunday')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('No program was found for the user');
        stubedProgramModel.restore();
    });
});
