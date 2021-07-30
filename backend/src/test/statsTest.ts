import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

import * as statsController from "../controller/stats";
import createCustomResponseObj from "../utils/helpers/forTests/responseDefaultObj";
import PhysicalStats from "../models/PhysicalStats";
import Goals from "../models/Goals";
import User from "../models/User";

describe("Stats controller tests", () => {
  const res = createCustomResponseObj();
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
  let stubedGoalsModel: SinonStub;
  let stubedUserModel: SinonStub;
  let stubedStatsModel: SinonStub;
  beforeEach(() => {
    stubedGoalsModel = sinon.stub(Goals, "findOne");
    stubedUserModel = sinon.stub(User, "findById");
    stubedStatsModel = sinon.stub(PhysicalStats, "findOne");
  });
  it("should handle user goal not found", async () => {
    stubedGoalsModel.returns(false);

    await statsController.addStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("User's goals not found");
  });

  it("should create stats model", async () => {
    stubedStatsModel.returns({ stats: [] });
    stubedGoalsModel.returns(true);
    stubedUserModel.returns({ grade: 0 });

    const stubedUserConstructor = sinon.stub(User.prototype, "save");
    const stubedStatsConstructor = sinon.stub(PhysicalStats.prototype, "save");

    await statsController.addStats(req as any, res as any, () => {});

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
