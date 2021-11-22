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
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
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
describe('post stats route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).post('/stats');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const payload = JSON.stringify({
            weight: 34,
            height: 251,
            fatPercentage: 8.5,
            musclesMass: 34.5,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/stats')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal(34);
        (0, chai_1.expect)(response.body.data[0].msg).equal('Weight needs to be in range 35kg-250kg');
        (0, chai_1.expect)(response.body.data[1].value).equal(251);
        (0, chai_1.expect)(response.body.data[1].msg).equal('Height needs to be in a range of 100cm-250cm');
        (0, chai_1.expect)(response.body.data[2].value).equal(8.5);
        (0, chai_1.expect)(response.body.data[2].msg).equal('Fat Percentage needs to be lower than 40%');
        (0, chai_1.expect)(response.body.data[3].value).equal(34.5);
        (0, chai_1.expect)(response.body.data[3].msg).equal('Muscles mass needs to be in a range of 10kg-200kg');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedGoalsModel = sinon_1.default.stub(Goals_1.default, 'findOne');
        stubedGoalsModel.returns(false);
        const payload = JSON.stringify({
            weight: 35,
            height: 250,
            fatPercentage: 35,
            musclesMass: 34,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/stats')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal("User's goals not found");
        stubedGoalsModel.restore();
    });
});
describe('get all stats dates route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/stats/all-stats-dates');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedPhysicalStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
        stubedPhysicalStatsModel.returns(false);
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/stats/all-stats-dates')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('No stats were found for this user');
        stubedPhysicalStatsModel.restore();
    });
});
describe('get stats by date route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/stats/date');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/stats/date')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal('date');
        (0, chai_1.expect)(response.body.data[0].msg).equal('invalid date');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedPhysicalStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
        stubedPhysicalStatsModel.returns(false);
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/stats/11-11-2001')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('No stats were found for this user');
        stubedPhysicalStatsModel.restore();
    });
});
describe('get all stats route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/stats');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedPhysicalStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
        stubedPhysicalStatsModel.returns({
            populate() {
                return false;
            },
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/stats')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('No stats were found for this user');
        stubedPhysicalStatsModel.restore();
    });
});
describe('change stats route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).put('/stats');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const payload = JSON.stringify({
            weight: 34,
            height: 251,
            fatPercentage: 8.5,
            musclesMass: 34.5,
            bodyImageUrl: 'not a url',
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/stats')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal(34);
        (0, chai_1.expect)(response.body.data[0].msg).equal('Weight needs to be in range 35kg-250kg');
        (0, chai_1.expect)(response.body.data[1].value).equal(251);
        (0, chai_1.expect)(response.body.data[1].msg).equal('Height needs to be in a range of 100cm-250cm');
        (0, chai_1.expect)(response.body.data[2].value).equal(8.5);
        (0, chai_1.expect)(response.body.data[2].msg).equal('Fat Percentage needs to be lower than 80%');
        (0, chai_1.expect)(response.body.data[3].value).equal(34.5);
        (0, chai_1.expect)(response.body.data[3].msg).equal('Muscles mass needs to be in a range of 10kg-200kg');
        (0, chai_1.expect)(response.body.data[4].value).equal('not a url');
        (0, chai_1.expect)(response.body.data[4].msg).equal('Image is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedPhysicalStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
        stubedPhysicalStatsModel.returns(false);
        const payload = JSON.stringify({
            weight: 35,
            height: 250,
            fatPercentage: 75,
            musclesMass: 34,
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .put('/stats')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('No stats were found for this user');
        stubedPhysicalStatsModel.restore();
    });
});
describe('delete last stats route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).delete('/stats');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedPhysicalStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
        stubedPhysicalStatsModel.returns(false);
        const response = await (0, supertest_1.default)(app_1.default)
            .delete('/stats')
            .set('Cookie', [`jon=${token}`]);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal('No stats were found for this user');
        stubedPhysicalStatsModel.restore();
    });
});
describe('post ranking route', () => {
    it('should send an error response if unauthorized', async () => {
        const response = await (0, supertest_1.default)(app_1.default).post('/stats/set-ranking');
        (0, chai_1.expect)(response.statusCode).equal(401);
        (0, chai_1.expect)(response.body.message).equal('Unauthorized cookie is invalid');
    });
    it('should send an error response for failing validation ', async () => {
        const payload = JSON.stringify({
            selfRank: 'not valid',
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/stats/set-ranking')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(422);
        (0, chai_1.expect)(response.body.message).equal('Validation Failed');
        (0, chai_1.expect)(response.body.data[0].value).equal('not valid');
        (0, chai_1.expect)(response.body.data[0].msg).equal('Ranking is invalid');
    });
    it('should move from validation middleware successfully', async () => {
        const stubedPhysicalStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
        stubedPhysicalStatsModel.returns(false);
        const payload = JSON.stringify({
            selfRank: 'Beginner',
        });
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/stats/set-ranking')
            .set('Cookie', [`jon=${token}`])
            .set('Content-type', 'application/json')
            .send(payload);
        (0, chai_1.expect)(response.statusCode).equal(403);
        (0, chai_1.expect)(response.text).equal("Something went wrong... Couldn't find stats that match the user");
        stubedPhysicalStatsModel.restore();
    });
});
