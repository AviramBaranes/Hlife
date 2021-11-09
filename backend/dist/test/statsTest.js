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
dotenv_1.default.config({ path: './config.env' });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const statsController = __importStar(require("../controller/stats"));
const responseDefaultObj_1 = __importDefault(require("../utils/helpers/forTests/responseDefaultObj"));
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
const Goals_1 = __importDefault(require("../models/Goals"));
const User_1 = __importDefault(require("../models/User"));
describe('addStats endpoint general tests', () => {
    const res = (0, responseDefaultObj_1.default)();
    const req = {
        userId: '123',
        body: {
            weight: 100,
            fatPercentage: 20,
            musclesMass: 30,
            height: 180,
            bodyImageUrl: 'image',
        },
    };
    let stubedGoalsModel;
    let stubedUserModel;
    let stubedStatsModel;
    beforeEach(() => {
        stubedGoalsModel = sinon_1.default.stub(Goals_1.default, 'findOne');
        stubedUserModel = sinon_1.default.stub(User_1.default, 'findById');
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
    });
    it('should handle user goal not found', async () => {
        stubedGoalsModel.returns(false);
        await statsController.addStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("User's goals not found");
    });
    it('should not add stats more then once in 7 days', async () => {
        stubedGoalsModel.returns(true);
        stubedStatsModel.returns({ stats: [{ date: new Date() }] });
        await statsController.addStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('You can only declare stats change once a day');
    });
    it('should create stats model', async () => {
        stubedStatsModel.returns({ stats: [], save: sinon_1.default.spy() });
        stubedGoalsModel.returns(true);
        stubedUserModel.returns({ grade: 0, save: sinon_1.default.spy() });
        await statsController.addStats(req, res, () => { });
        const user = User_1.default.findById({});
        const stats = PhysicalStats_1.default.findOne();
        const newStats = stats.stats[0];
        (0, chai_1.expect)(newStats.date).instanceOf(Date);
        (0, chai_1.expect)(newStats.deservedGrade).equal(15);
        (0, chai_1.expect)(newStats.weight).equal(100);
        (0, chai_1.expect)(newStats.height).equal(180);
        (0, chai_1.expect)(newStats.fatPercentage).equal(20);
        (0, chai_1.expect)(newStats.musclesMass).equal(30);
        (0, chai_1.expect)(user.grade).equal(15);
        (0, chai_1.expect)(user.hasInitialStats).equal(true);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(stats.stats.length).equal(1);
        (0, chai_1.expect)(stats.save.called).equal(true);
    });
    it('should return the right response', () => {
        const data = res.jsonObj;
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(data.messages).eql([]);
        (0, chai_1.expect)(data.currentGrade).equal(15);
        (0, chai_1.expect)(data.messages).eql([]);
        (0, chai_1.expect)(data.accomplishments).eql({});
    });
    afterEach(() => {
        stubedUserModel.restore();
        stubedStatsModel.restore();
        stubedGoalsModel.restore();
    });
});
describe('addStats endpoint deeply tests', () => {
    const res = (0, responseDefaultObj_1.default)();
    const req = {
        userId: '123',
        body: {
            weight: 100,
            fatPercentage: 20,
            musclesMass: 30,
            height: 180,
            bodyImageUrl: 'image',
        },
    };
    let stubedGoalsModel;
    let stubedUserModel;
    let stubedStatsModel;
    let stubedDate;
    before(() => {
        stubedDate = sinon_1.default.stub(Date.prototype, 'getTime');
        stubedDate.returns(Infinity);
    });
    after(() => {
        stubedDate.restore();
    });
    beforeEach(() => {
        stubedGoalsModel = sinon_1.default.stub(Goals_1.default, 'findOne');
        stubedUserModel = sinon_1.default.stub(User_1.default, 'findById');
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
        stubedGoalsModel.returns({
            basicGoal: 'lose fat',
            detailGoals: { weight: 30, fatPercentage: 5, musclesMass: 100 },
        });
    });
    it('should add the grade and send messages', async () => {
        const statsArray = [];
        stubedUserModel.returns({ grade: 0, save: sinon_1.default.spy() });
        stubedStatsModel.returns({ stats: statsArray, save: sinon_1.default.spy() });
        await statsController.addStats(req, res, () => { });
        req.body = {
            height: 1,
            bodyImageUrl: '',
            weight: 110,
            fatPercentage: 25,
            musclesMass: 25,
        };
        await statsController.addStats(req, res, () => { });
        const user = User_1.default.findById({});
        const stats = PhysicalStats_1.default.findOne();
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(user.grade).equal(30);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(stats.stats.length).equal(2);
        (0, chai_1.expect)(stats.save.called).equal(true);
        (0, chai_1.expect)(res.jsonObj.messages[0]).equal("Unfortunately you didn't reduced your fat percentage this time");
        (0, chai_1.expect)(res.jsonObj.messages[1]).equal("Unfortunately you didn't gain more muscles mass this time");
        (0, chai_1.expect)(res.jsonObj.messages[2]).equal('You failed to lose weight');
        (0, chai_1.expect)(res.jsonObj.accomplishments).eql({});
    });
    it('should add the grade and send messages (weight improved)', async () => {
        const statsArray = [];
        stubedUserModel.returns({ grade: 0, save: sinon_1.default.spy() });
        stubedStatsModel.returns({ stats: statsArray, save: sinon_1.default.spy() });
        await statsController.addStats(req, res, () => { });
        req.body = {
            height: 1,
            bodyImageUrl: '',
            weight: 100,
            fatPercentage: 25,
            musclesMass: 25,
        };
        await statsController.addStats(req, res, () => { });
        const user = User_1.default.findById({});
        const stats = PhysicalStats_1.default.findOne();
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(user.grade).equal(35);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(stats.stats.length).equal(2);
        (0, chai_1.expect)(stats.save.called).equal(true);
        (0, chai_1.expect)(res.jsonObj.messages[0]).equal("Unfortunately you didn't reduced your fat percentage this time");
        (0, chai_1.expect)(res.jsonObj.messages[1]).equal("Unfortunately you didn't gain more muscles mass this time");
        (0, chai_1.expect)(res.jsonObj.messages.length).equal(2);
        (0, chai_1.expect)(res.jsonObj.accomplishments).eql({});
    });
    it('should add the grade and send messages (musclesMass improved)', async () => {
        const statsArray = [];
        stubedUserModel.returns({ grade: 0, save: sinon_1.default.spy() });
        stubedStatsModel.returns({ stats: statsArray, save: sinon_1.default.spy() });
        await statsController.addStats(req, res, () => { });
        req.body = {
            height: 1,
            bodyImageUrl: '',
            weight: 90,
            fatPercentage: 25,
            musclesMass: 30,
        };
        await statsController.addStats(req, res, () => { });
        const user = User_1.default.findById({});
        const stats = PhysicalStats_1.default.findOne();
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(user.grade).equal(40);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(stats.save.called).equal(true);
        (0, chai_1.expect)(res.jsonObj.messages[0]).equal("Unfortunately you didn't reduced your fat percentage this time");
        (0, chai_1.expect)(res.jsonObj.messages.length).equal(1);
        (0, chai_1.expect)(res.jsonObj.accomplishments).eql({});
    });
    it('should add the grade and send messages (all improved)', async () => {
        const statsArray = [];
        stubedUserModel.returns({ grade: 0, save: sinon_1.default.spy() });
        stubedStatsModel.returns({ stats: statsArray, save: sinon_1.default.spy() });
        await statsController.addStats(req, res, () => { });
        req.body = {
            height: 1,
            bodyImageUrl: '',
            weight: 88,
            fatPercentage: 20,
            musclesMass: 31,
        };
        await statsController.addStats(req, res, () => { });
        const user = User_1.default.findById({});
        const stats = PhysicalStats_1.default.findOne();
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(user.grade).equal(45);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(stats.save.called).equal(true);
        (0, chai_1.expect)(res.jsonObj.messages.length).equal(0);
        (0, chai_1.expect)(res.jsonObj.accomplishments).eql({});
    });
    it('should add the grade and send messages (weight reached goal)', async () => {
        const statsArray = [];
        stubedUserModel.returns({ grade: 0, save: sinon_1.default.spy() });
        stubedStatsModel.returns({ stats: statsArray, save: sinon_1.default.spy() });
        await statsController.addStats(req, res, () => { });
        req.body = {
            height: 1,
            bodyImageUrl: '',
            weight: 30,
            fatPercentage: 19,
            musclesMass: 32,
        };
        await statsController.addStats(req, res, () => { });
        const user = User_1.default.findById({});
        const stats = PhysicalStats_1.default.findOne();
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(user.grade).equal(50);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(stats.save.called).equal(true);
        (0, chai_1.expect)(res.jsonObj.messages.length).equal(0);
        (0, chai_1.expect)(res.jsonObj.accomplishments.weight).equal(true);
        (0, chai_1.expect)(res.jsonObj.accomplishments.fatPercentage).equal(undefined);
        (0, chai_1.expect)(res.jsonObj.accomplishments.musclesMass).equal(undefined);
    });
    it('should add the grade and send messages (fatPercentage reached goal)', async () => {
        const statsArray = [];
        stubedUserModel.returns({ grade: 0, save: sinon_1.default.spy() });
        stubedStatsModel.returns({ stats: statsArray, save: sinon_1.default.spy() });
        await statsController.addStats(req, res, () => { });
        req.body = {
            height: 1,
            bodyImageUrl: '',
            weight: 29,
            fatPercentage: 5,
            musclesMass: 33,
        };
        await statsController.addStats(req, res, () => { });
        const user = User_1.default.findById({});
        const stats = PhysicalStats_1.default.findOne();
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(user.grade).equal(55);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(stats.save.called).equal(true);
        (0, chai_1.expect)(res.jsonObj.messages.length).equal(0);
        (0, chai_1.expect)(res.jsonObj.accomplishments.weight).equal(true);
        (0, chai_1.expect)(res.jsonObj.accomplishments.fatPercentage).equal(true);
        (0, chai_1.expect)(res.jsonObj.accomplishments.musclesMass).equal(undefined);
    });
    it('should add the grade and send messages (fatPercentage reached goal)', async () => {
        const statsArray = [];
        stubedUserModel.returns({ grade: 0, save: sinon_1.default.spy() });
        stubedStatsModel.returns({ stats: statsArray, save: sinon_1.default.spy() });
        await statsController.addStats(req, res, () => { });
        req.body = {
            height: 1,
            bodyImageUrl: '',
            weight: 28,
            fatPercentage: 4,
            musclesMass: 100,
        };
        await statsController.addStats(req, res, () => { });
        const user = User_1.default.findById({});
        const stats = PhysicalStats_1.default.findOne();
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(user.grade).equal(60);
        (0, chai_1.expect)(user.save.called).equal(true);
        (0, chai_1.expect)(stats.save.called).equal(true);
        (0, chai_1.expect)(res.jsonObj.messages.length).equal(0);
        (0, chai_1.expect)(res.jsonObj.accomplishments.weight).equal(true);
        (0, chai_1.expect)(res.jsonObj.accomplishments.fatPercentage).equal(true);
        (0, chai_1.expect)(res.jsonObj.accomplishments.musclesMass).equal(true);
    });
    afterEach(() => {
        stubedUserModel.restore();
        stubedStatsModel.restore();
        stubedGoalsModel.restore();
    });
});
describe('getAllStatsDates endpoint tests', () => {
    const req = {
        userId: '123',
    };
    let res;
    let stubedStatsModel;
    beforeEach(() => {
        res = (0, responseDefaultObj_1.default)();
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
    });
    it('should send error response if no userStats found', async () => {
        stubedStatsModel.returns(false);
        await statsController.getAllStatsDates(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were found for this user');
    });
    it('should send error response if no stats were yet to be created', async () => {
        stubedStatsModel.returns({
            stats: [],
        });
        await statsController.getAllStatsDates(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were created yet');
    });
    it('should send success response with all the stats', async () => {
        const stats = [
            { data: 'data1', moreData: 'moreData1', date: 1 },
            { data: 'data2', moreData: 'moreData2', date: 2 },
            { data: 'data3', moreData: 'moreData3', date: 3 },
        ];
        stubedStatsModel.returns({
            stats,
        });
        const expectedData = [1, 2, 3];
        await statsController.getAllStatsDates(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj.statsDates).eql(expectedData);
    });
    afterEach(() => {
        stubedStatsModel.restore();
    });
});
describe('getStatsByDate endpoint tests', () => {
    const req = {
        userId: '123',
        params: {},
    };
    let res;
    let stubedStatsModel;
    beforeEach(() => {
        res = (0, responseDefaultObj_1.default)();
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
    });
    it('should send error response if no userStats found', async () => {
        stubedStatsModel.returns(false);
        await statsController.getStatsByDate(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were found for this user');
    });
    it('should send error response if no stats found by date', async () => {
        stubedStatsModel.returns({
            stats: [{ date: '' }, { date: '11/11/1999' }, { date: '' }],
        });
        req.params.date = '11/11/2001';
        await statsController.getStatsByDate(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('Invalid date, no stats were entered at this date');
    });
    it('should send success response with the requested stats', async () => {
        stubedStatsModel.returns({
            stats: [
                { date: '' },
                { moreData: 'data', date: '11/11/2001' },
                { date: '' },
            ],
        });
        await statsController.getStatsByDate(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj.moreData).equal('data');
        (0, chai_1.expect)(res.jsonObj.date).equal('11/11/2001');
    });
    afterEach(() => {
        stubedStatsModel.restore();
    });
});
describe('getAllStats endpoint tests', () => {
    const req = {
        userId: '123',
    };
    let res;
    let stubedStatsModel;
    beforeEach(() => {
        res = (0, responseDefaultObj_1.default)();
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
    });
    it('should send error response if no userStats found', async () => {
        stubedStatsModel.returns({ populate: () => false });
        await statsController.getAllStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were found for this user');
    });
    it('should send error response if no stats were yet to be created', async () => {
        stubedStatsModel.returns({
            populate() {
                return {
                    stats: [],
                };
            },
        });
        await statsController.getAllStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were created yet');
    });
    it('should send success response with all the stats', async () => {
        const stats = [
            { data: 'data1', moreData: 'moreData1' },
            { data: 'data2', moreData: 'moreData2' },
            { data: 'data3', moreData: 'moreData3' },
        ];
        stubedStatsModel.returns({
            populate() {
                return {
                    stats,
                };
            },
        });
        await statsController.getAllStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.jsonObj.stats).eql(stats);
    });
    afterEach(() => {
        stubedStatsModel.restore();
    });
});
describe('deleteLastStats endpoint tests', () => {
    const req = {
        userId: '123',
    };
    let res;
    let stubedStatsModel;
    beforeEach(() => {
        res = (0, responseDefaultObj_1.default)();
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
    });
    it('should send error response if no userStats found', async () => {
        stubedStatsModel.returns(false);
        await statsController.deleteLastStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were found for this user');
    });
    it('should send error response if no stats were yet to be created', async () => {
        stubedStatsModel.returns({
            stats: [],
        });
        await statsController.deleteLastStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were created yet');
    });
    it('should send error response if stats were created over 24 hours ago', async () => {
        stubedStatsModel.returns({
            stats: [{ date: new Date().getTime() - 100 * 60 * 60 * 25 }],
        });
        await statsController.deleteLastStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("It's been over 24 hours since the last stats were created, You can't delete them");
    });
    it('should send success response and delete the last stats', async () => {
        stubedStatsModel.returns({
            save: sinon_1.default.spy(),
            stats: [{ data: 'first data' }, { data: 'last data', date: new Date() }],
        });
        await statsController.deleteLastStats(req, res, () => { });
        const userStats = PhysicalStats_1.default.findOne();
        const lastStatsIndex = userStats.stats.length - 1;
        const lastStats = userStats.stats[lastStatsIndex];
        (0, chai_1.expect)(lastStats.data).equal('first data');
        (0, chai_1.expect)(userStats.save.called).equal(true);
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.msg).equal('The last stats were deleted');
    });
    afterEach(() => {
        stubedStatsModel.restore();
    });
});
describe('changeLastStats endpoint tests', () => {
    const req = {
        userId: '123',
        body: {},
    };
    let res;
    let stubedStatsModel;
    beforeEach(() => {
        res = (0, responseDefaultObj_1.default)();
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
    });
    it('should send error response if no userStats found', async () => {
        stubedStatsModel.returns(false);
        await statsController.changeLastStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were found for this user');
    });
    it('should send error response if no stats were yet to be created', async () => {
        stubedStatsModel.returns({
            stats: [],
        });
        await statsController.changeLastStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No stats were created yet');
    });
    it('should send error response if stats were created over 24 hours ago', async () => {
        stubedStatsModel.returns({
            stats: [{ date: new Date().getTime() - 100 * 60 * 60 * 25 }],
        });
        await statsController.changeLastStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("It's been over 24 hours since the last stats were created, You can't change them");
    });
    it('should send error response if no data was sent', async () => {
        stubedStatsModel.returns({
            stats: [{ date: new Date() }],
        });
        await statsController.changeLastStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal('No data was provided');
    });
    it('should change the last stats and send success response', async () => {
        stubedStatsModel.returns({
            save: sinon_1.default.spy(),
            stats: [{ data: 'data' }, { date: new Date() }],
        });
        req.body.weight = 1;
        req.body.height = 2;
        req.body.fatPercentage = 3;
        req.body.musclesMass = 4;
        req.body.bodyImageUrl = 'image';
        await statsController.changeLastStats(req, res, () => { });
        const userStats = PhysicalStats_1.default.findOne();
        const lastStatsIndex = userStats.stats.length - 1;
        const lastStats = userStats.stats[lastStatsIndex];
        (0, chai_1.expect)(lastStats.weight).equal(1);
        (0, chai_1.expect)(lastStats.height).equal(2);
        (0, chai_1.expect)(lastStats.fatPercentage).equal(3);
        (0, chai_1.expect)(lastStats.musclesMass).equal(4);
        (0, chai_1.expect)(lastStats.bodyImageUrl).equal('image');
        (0, chai_1.expect)(userStats.save.called).equal(true);
    });
    it('should send success response and change the last stats', async () => {
        stubedStatsModel.returns({
            save: sinon_1.default.spy(),
            stats: [{ data: 'data' }, { date: new Date() }],
        });
        req.body.weight = 1;
        await statsController.changeLastStats(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.msg).equal('The last stats were updated');
    });
    afterEach(() => {
        stubedStatsModel.restore();
    });
});
describe('set ranks tests', () => {
    const req = { userId: '123', body: { selfRank: 'new rank' } };
    const res = (0, responseDefaultObj_1.default)();
    let stubedStats;
    before(() => {
        stubedStats = sinon_1.default.stub(PhysicalStats_1.default, 'findOne');
    });
    it('should send an error response if physical stats was not found', async () => {
        stubedStats.returns(false);
        await statsController.setRanking(req, res, () => { });
        (0, chai_1.expect)(res.statusCode).equal(403);
        (0, chai_1.expect)(res.msg).equal("Something went wrong... Couldn't find stats that match the user");
    });
    it('should save the new rank', async () => {
        stubedStats.returns({ save: sinon_1.default.spy() });
        await statsController.setRanking(req, res, () => { });
        const stats = await PhysicalStats_1.default.findOne();
        (0, chai_1.expect)(stats.rank).equal('new rank');
        (0, chai_1.expect)(stats.save.called).equal(true);
    });
    it('should send a success response', () => {
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(res.msg).equal('Ranking the user successfully');
    });
    after(() => {
        stubedStats.restore();
    });
});
