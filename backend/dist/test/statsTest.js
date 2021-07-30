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
const statsController = __importStar(require("../controller/stats"));
const responseDefaultObj_1 = __importDefault(require("../utils/helpers/forTests/responseDefaultObj"));
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
const Goals_1 = __importDefault(require("../models/Goals"));
const User_1 = __importDefault(require("../models/User"));
describe("Stats controller tests", () => {
    const res = responseDefaultObj_1.default();
    const req = {
        userId: "123",
        body: {
            weight: 100,
            fatPercentage: 20,
            muscelesMass: 30,
            height: 180,
            bodyImageUrl: "image",
        },
    };
    let stubedGoalsModel;
    let stubedUserModel;
    let stubedStatsModel;
    beforeEach(() => {
        stubedGoalsModel = sinon_1.default.stub(Goals_1.default, "findOne");
        stubedUserModel = sinon_1.default.stub(User_1.default, "findById");
        stubedStatsModel = sinon_1.default.stub(PhysicalStats_1.default, "findOne");
    });
    it("should handle user goal not found", async () => {
        stubedGoalsModel.returns(false);
        await statsController.addStats(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("User's goals not found");
    });
    it("should create stats model", async () => {
        stubedStatsModel.returns({ stats: [] });
        stubedGoalsModel.returns(true);
        stubedUserModel.returns({ grade: 0 });
        const stubedUserConstructor = sinon_1.default.stub(User_1.default.prototype, "save");
        const stubedStatsConstructor = sinon_1.default.stub(PhysicalStats_1.default.prototype, "save");
        await statsController.addStats(req, res, () => { });
        console.log(stubedStatsConstructor.firstCall.thisValue);
        console.log(stubedUserConstructor.firstCall.thisValue);
    });
    afterEach(() => {
        stubedUserModel.restore();
        stubedStatsModel.restore();
        stubedGoalsModel.restore();
    });
});
//first time adding stats
//adding stats again
//testing responses
//testing weight goal break
//testing weight improved
//testing fat goal break
//testing fat improved
//testing musceles goal break
//testing musceles improved
// stubedGoalsModel.returns({
//   basicGoals: "lose weight",
//   detailGoals: { weight: 80, fatPercentage: 15, muscelesMass: 40 },
// });
