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
const Goals_1 = __importDefault(require("../models/Goals"));
const goalsController = __importStar(require("../controller/goals"));
const responseDefaultObj_1 = __importDefault(require("../utils/helpers/forTests/responseDefaultObj"));
describe("create goals tests", () => {
    const req = {
        body: {
            basicGoal: "goal",
            weight: 1,
            fatPercentage: 2,
            musclesMass: 3,
        },
    };
    const res = responseDefaultObj_1.default();
    it("create the right goals model", async () => {
        const stubedGoalsModel = sinon_1.default.stub(Goals_1.default.prototype, "save");
        await goalsController.createGoal(req, res, () => { });
        const argumentForConstructor = stubedGoalsModel.firstCall.thisValue;
        chai_1.expect(argumentForConstructor.basicGoal).equal("goal");
        chai_1.expect(argumentForConstructor.detailGoals.weight).equal(1);
        chai_1.expect(argumentForConstructor.detailGoals.fatPercentage).equal(2);
        chai_1.expect(argumentForConstructor.detailGoals.musclesMass).equal(3);
        stubedGoalsModel.restore();
    });
    it("should return with success response", () => {
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals created successfully");
    });
});
describe("get goals tests", () => {
    const req = {
        userId: "123",
    };
    const res = responseDefaultObj_1.default();
    let stubedGoalsModel;
    beforeEach(() => {
        stubedGoalsModel = sinon_1.default.stub(Goals_1.default, "findOne");
    });
    it("send error response if no model was found", async () => {
        stubedGoalsModel.returns(false);
        await goalsController.getGoals(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("Goals have not created yet for this user");
    });
    it("send error response if no model was found", async () => {
        stubedGoalsModel.returns({ data1: "data1", data2: "data2" });
        await goalsController.getGoals(req, res, () => { });
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.jsonObj.data1).equal("data1");
        chai_1.expect(res.jsonObj.data2).equal("data2");
    });
    afterEach(() => {
        stubedGoalsModel.restore();
    });
});
describe("change basic goal tests", () => {
    const req = {
        userId: "123",
        body: {},
    };
    const res = responseDefaultObj_1.default();
    let stubedGoalsModel;
    beforeEach(() => {
        stubedGoalsModel = sinon_1.default.stub(Goals_1.default, "findOne");
    });
    it("send error response if no model was found", async () => {
        stubedGoalsModel.returns(false);
        await goalsController.changeBasicGoal(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("Goals have not created yet for this user");
    });
    it("should send error response if no fatPercentage provided", async () => {
        stubedGoalsModel.returns({
            basicGoal: "increase muscles mass",
            detailGoal: {},
        });
        await goalsController.changeBasicGoal(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("If you want to lose fat you need to provide your fat percentage");
    });
    it("should send error response if no muscles mass provided", async () => {
        stubedGoalsModel.returns({
            basicGoal: "lose fat",
            detailGoal: {},
        });
        await goalsController.changeBasicGoal(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("If you want to increase muscles mass you need to provide your muscles mass");
    });
    it("should not change fatPercentage if already exist", async () => {
        stubedGoalsModel.returns({
            save: sinon_1.default.spy(),
            basicGoal: "increase muscles mass",
            detailGoal: { fatPercentage: 10 },
        });
        await goalsController.changeBasicGoal(req, res, () => { });
        const userGoal = Goals_1.default.findOne();
        chai_1.expect(userGoal.save.called).equal(true);
        chai_1.expect(userGoal.basicGoal).equal("lose fat");
        chai_1.expect(userGoal.detailGoal.fatPercentage).equal(10);
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals updated");
    });
    it("should not change musclesMass if already exist", async () => {
        stubedGoalsModel.returns({
            save: sinon_1.default.spy(),
            basicGoal: "lose fat",
            detailGoal: { musclesMass: 10 },
        });
        await goalsController.changeBasicGoal(req, res, () => { });
        const userGoal = Goals_1.default.findOne();
        chai_1.expect(userGoal.save.called).equal(true);
        chai_1.expect(userGoal.basicGoal).equal("increase muscles mass");
        chai_1.expect(userGoal.detailGoal.musclesMass).equal(10);
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals updated");
    });
    it("should change basicGoal to increase muscles mass and enter muscles mass goal", async () => {
        stubedGoalsModel.returns({
            detailGoal: {},
            basicGoal: "lose fat",
            save: sinon_1.default.spy(),
        });
        req.body.musclesMass = 10;
        await goalsController.changeBasicGoal(req, res, () => { });
        const userGoal = Goals_1.default.findOne();
        chai_1.expect(userGoal.save.called).equal(true);
        chai_1.expect(userGoal.basicGoal).equal("increase muscles mass");
        chai_1.expect(userGoal.detailGoal.musclesMass).equal(10);
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals updated");
    });
    it("should change basicGoal to lose fat and enter new fatPercentage field", async () => {
        stubedGoalsModel.returns({
            detailGoal: {},
            basicGoal: "increase muscles mass",
            save: sinon_1.default.spy(),
        });
        req.body.fatPercentage = 10;
        await goalsController.changeBasicGoal(req, res, () => { });
        const userGoal = Goals_1.default.findOne();
        chai_1.expect(userGoal.save.called).equal(true);
        chai_1.expect(userGoal.basicGoal).equal("lose fat");
        chai_1.expect(userGoal.detailGoal.fatPercentage).equal(10);
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals updated");
    });
    afterEach(() => {
        stubedGoalsModel.restore();
    });
});
describe("change goals tests", () => {
    const req = {
        userId: "123",
        body: {},
    };
    const res = responseDefaultObj_1.default();
    let stubedGoalsModel;
    beforeEach(() => {
        stubedGoalsModel = sinon_1.default.stub(Goals_1.default, "findOne");
    });
    it("send error response if no model was found", async () => {
        stubedGoalsModel.returns(false);
        await goalsController.changeGoals(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("Goals have not created yet for this user");
    });
    it("should send error response if no data found", async () => {
        stubedGoalsModel.returns(true);
        await goalsController.changeGoals(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("No parameters were provided");
    });
    it("should update weight property in user goals", async () => {
        stubedGoalsModel.returns({ detailedGoals: {}, save: sinon_1.default.spy() });
        req.body.weight = 1;
        await goalsController.changeGoals(req, res, () => { });
        const userGoal = Goals_1.default.findOne();
        chai_1.expect(userGoal.save.called).equal(true);
        chai_1.expect(userGoal.detailedGoals.weight).equal(1);
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals updated");
    });
    it("should update fatPercentage property in user goals", async () => {
        stubedGoalsModel.returns({ detailedGoals: {}, save: sinon_1.default.spy() });
        req.body.fatPercentage = 1;
        await goalsController.changeGoals(req, res, () => { });
        const userGoal = Goals_1.default.findOne();
        chai_1.expect(userGoal.save.called).equal(true);
        chai_1.expect(userGoal.detailedGoals.fatPercentage).equal(1);
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals updated");
    });
    it("should update musclesMass property in user goals", async () => {
        stubedGoalsModel.returns({ detailedGoals: {}, save: sinon_1.default.spy() });
        req.body.musclesMass = 1;
        await goalsController.changeGoals(req, res, () => { });
        const userGoal = Goals_1.default.findOne();
        chai_1.expect(userGoal.save.called).equal(true);
        chai_1.expect(userGoal.detailedGoals.musclesMass).equal(1);
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals updated");
    });
    it("should update all property in user goals", async () => {
        stubedGoalsModel.returns({ detailedGoals: {}, save: sinon_1.default.spy() });
        req.body.musclesMass = 1;
        req.body.fatPercentage = 2;
        req.body.weight = 3;
        await goalsController.changeGoals(req, res, () => { });
        const userGoal = Goals_1.default.findOne();
        chai_1.expect(userGoal.save.called).equal(true);
        chai_1.expect(userGoal.detailedGoals.musclesMass).equal(1);
        chai_1.expect(userGoal.detailedGoals.fatPercentage).equal(2);
        chai_1.expect(userGoal.detailedGoals.weight).equal(3);
        chai_1.expect(res.statusCode).equal(201);
        chai_1.expect(res.msg).equal("Goals updated");
    });
    afterEach(() => {
        stubedGoalsModel.restore();
    });
});
