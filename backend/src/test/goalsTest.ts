import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import sinon from "sinon";

import Goals from "../models/Goals";

import * as goalsController from "../controller/goals";
import createCustomResponseObj from "../utils/helpers/forTests/responseDefaultObj";

describe("Goals controller tests", () => {
  const req = {
    body: {
      basicGoal: "goal",
      weight: 1,
      fatPercentage: 2,
      muscelesMass: 3,
    },
  };
  const res = createCustomResponseObj();
  it("create the right goals model", async () => {
    const stubedGoalsModel = sinon.stub(Goals.prototype, "save");

    await goalsController.createGoal(req as any, res as any, () => {});

    const argumentForConstructor = stubedGoalsModel.firstCall.thisValue;

    expect(argumentForConstructor.basicGoal).equal("goal");
    expect(argumentForConstructor.detailGoals.weight).equal(1);
    expect(argumentForConstructor.detailGoals.fatPercentage).equal(2);
    expect(argumentForConstructor.detailGoals.muscelesMass).equal(3);

    stubedGoalsModel.restore();
  });

  it("should return with success response", () => {
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals created successfully");
  });
});
