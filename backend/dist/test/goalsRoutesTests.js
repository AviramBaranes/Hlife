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
describe('post goals route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).post('/goals');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const payload = JSON.stringify({
            basicGoal: 'invalid',
            weight: 10,
            fatPercentage: 51,
            musclesMass: 24,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/goals')
            .set({ Authorization: `Bearer ${token}` })
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal('invalid');
        (0, chai_1.expect)(response.body.data[0].msg).equal("basic goal can be either 'lose fat' or 'increase muscles mass'");
        (0, chai_1.expect)(response.body.data[1].value).equal(10);
        (0, chai_1.expect)(response.body.data[1].msg).equal('Weight must be a number');
        (0, chai_1.expect)(response.body.data[2].value).equal(51);
        (0, chai_1.expect)(response.body.data[2].msg).equal('Fat percentage must be a number');
        (0, chai_1.expect)(response.body.data[3].value).equal(24);
        (0, chai_1.expect)(response.body.data[3].msg).equal('Muscles mass must be a number');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedUser = sinon_1.default.stub(User_1.default, 'findById');
        stubedUser.returns({ hasGoals: true });
        const payload = JSON.stringify({
            basicGoal: 'lose fat',
            weight: 30,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/goals')
            .set({ Authorization: `Bearer ${token}` })
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('User already created goals');
        stubedUser.restore();
    });
});
describe('change basic goal route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).put('/goals/basicGoal');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const payload = JSON.stringify({
            fatPercentage: 51,
            musclesMass: 24,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/goals/basicGoal')
            .set({ Authorization: `Bearer ${token}` })
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal(51);
        (0, chai_1.expect)(response.body.data[0].msg).equal('Fat percentage must be a number');
        (0, chai_1.expect)(response.body.data[1].value).equal(24);
        (0, chai_1.expect)(response.body.data[1].msg).equal('Muscles mass must be a number');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedGoalsModel = sinon_1.default.stub(Goals_1.default, 'findOne');
        stubedGoalsModel.returns(false);
        const payload = JSON.stringify({
            fatPercentage: 50,
            musclesMass: 25,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/goals/basicGoal')
            .set({ Authorization: `Bearer ${token}` })
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('Goals have not created yet for this user');
        stubedGoalsModel.restore();
    });
});
describe('change goals route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).put('/goals');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const payload = JSON.stringify({
            weight: 29,
            fatPercentage: 51,
            musclesMass: 24,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/goals')
            .set({ Authorization: `Bearer ${token}` })
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal(29);
        (0, chai_1.expect)(response.body.data[0].msg).equal('Weight must be a number');
        (0, chai_1.expect)(response.body.data[1].value).equal(51);
        (0, chai_1.expect)(response.body.data[1].msg).equal('Fat percentage must be a number');
        (0, chai_1.expect)(response.body.data[2].value).equal(24);
        (0, chai_1.expect)(response.body.data[2].msg).equal('Muscles mass must be a number');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedGoalsModel = sinon_1.default.stub(Goals_1.default, 'findOne');
        stubedGoalsModel.returns(false);
        const payload = JSON.stringify({
            weight: 30,
            fatPercentage: 50,
            musclesMass: 25,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/goals')
            .set({ Authorization: `Bearer ${token}` })
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('Goals have not created yet for this user');
        stubedGoalsModel.restore();
    });
    it('should move from validation middleware successfully (optional values are omitted)', async () => {
        const stubedGoalsModel = sinon_1.default.stub(Goals_1.default, 'findOne');
        stubedGoalsModel.returns(false);
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/goals')
            .set({ Authorization: `Bearer ${token}` })
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('Goals have not created yet for this user');
        stubedGoalsModel.restore();
    });
});
describe('get goals route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/goals');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedGoalsModel = sinon_1.default.stub(Goals_1.default, 'findOne');
        stubedGoalsModel.returns(false);
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/goals')
            .set({ Authorization: `Bearer ${token}` });
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('Goals have not created yet for this user');
        stubedGoalsModel.restore();
    });
});
