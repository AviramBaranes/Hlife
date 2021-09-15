import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

import Goals from "../models/Goals";

import * as goalsController from "../controller/goals";
import createCustomResponseObj from "../utils/helpers/forTests/responseDefaultObj";
import User from "../models/User";

interface ReqBody {
  weight?: number;
  fatPercentage?: number;
  musclesMass?: number;
}

describe("create goals tests", () => {
  const req = {
    body: {
      basicGoal: "lose fat",
      weight: 1,
    } as any,
  };
  const res = createCustomResponseObj();
  let stubedUser: SinonStub;
  beforeEach(() => {
    stubedUser = sinon.stub(User, "findById");
    stubedUser.returns({ hasGoals: false, save: () => {} });
  });
  afterEach(() => {
    stubedUser.restore();
  });
  it("should send an error response if goal already created", async () => {
    stubedUser.returns({ hasGoals: true });

    await goalsController.createGoal(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("User already created goals");
  });
  it("should send an error response if basic goal is lose fat and there is no fatPercentage data", async () => {
    await goalsController.createGoal(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "If you want to lose fat you need to provide your fat percentage"
    );
  });

  it("should send an error response if basic goal is gain muscle mass and there is no musclesMass data", async () => {
    req.body.basicGoal = "increase muscles mass";
    await goalsController.createGoal(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "If you want to increase muscles mass you need to provide your muscles mass"
    );
  });

  it("create the right goals model", async () => {
    const stubedGoalsModel = sinon.stub(Goals.prototype, "save");
    req.body.fatPercentage = 2;
    req.body.musclesMass = 3;
    await goalsController.createGoal(req as any, res as any, () => {});

    const argumentForConstructor = stubedGoalsModel.firstCall.thisValue;

    expect(argumentForConstructor.basicGoal).equal("increase muscles mass");
    expect(argumentForConstructor.detailGoals.weight).equal(1);
    expect(argumentForConstructor.detailGoals.fatPercentage).equal(2);
    expect(argumentForConstructor.detailGoals.musclesMass).equal(3);

    stubedGoalsModel.restore();
  });

  it("should return with success response", () => {
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals created successfully");
  });
});

describe("get goals tests", () => {
  const req = {
    userId: "123",
  };
  const res = createCustomResponseObj();
  let stubedGoalsModel: SinonStub;
  beforeEach(() => {
    stubedGoalsModel = sinon.stub(Goals, "findOne");
  });

  it("send error response if no model was found", async () => {
    stubedGoalsModel.returns(false);

    await goalsController.getGoals(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Goals have not created yet for this user");
  });
  it("send error response if no model was found", async () => {
    stubedGoalsModel.returns({ data1: "data1", data2: "data2" });

    await goalsController.getGoals(req as any, res as any, () => {});

    expect(res.statusCode).equal(201);
    expect(res.jsonObj.data1).equal("data1");
    expect(res.jsonObj.data2).equal("data2");
  });

  afterEach(() => {
    stubedGoalsModel.restore();
  });
});

describe("change basic goal tests", () => {
  const req = {
    userId: "123",
    body: <{ musclesMass?: number; fatPercentage?: number }>{},
  };
  const res = createCustomResponseObj();
  let stubedGoalsModel: SinonStub;

  beforeEach(() => {
    stubedGoalsModel = sinon.stub(Goals, "findOne");
  });

  it("should send an error response if no model was found", async () => {
    stubedGoalsModel.returns(false);

    await goalsController.changeBasicGoal(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Goals have not created yet for this user");
  });

  it("should send an error response if no fatPercentage provided", async () => {
    stubedGoalsModel.returns({
      basicGoal: "increase muscles mass",
      detailGoals: {},
    });

    await goalsController.changeBasicGoal(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "If you want to lose fat you need to provide your fat percentage"
    );
  });

  it("should send an error response if no muscles mass provided", async () => {
    stubedGoalsModel.returns({
      basicGoal: "lose fat",
      detailGoals: {},
    });

    await goalsController.changeBasicGoal(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "If you want to increase muscles mass you need to provide your muscles mass"
    );
  });

  it("should not change fatPercentage if already exist", async () => {
    stubedGoalsModel.returns({
      save: sinon.spy(),
      basicGoal: "increase muscles mass",
      detailGoals: { fatPercentage: 10 },
    });

    await goalsController.changeBasicGoal(req as any, res as any, () => {});

    const userGoal = Goals.findOne();

    expect(userGoal.save.called).equal(true);
    expect(userGoal.basicGoal).equal("lose fat");
    expect(userGoal.detailGoals.fatPercentage).equal(10);
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals updated");
  });

  it("should not change musclesMass if already exist", async () => {
    stubedGoalsModel.returns({
      save: sinon.spy(),
      basicGoal: "lose fat",
      detailGoals: { musclesMass: 10 },
    });

    await goalsController.changeBasicGoal(req as any, res as any, () => {});

    const userGoal = Goals.findOne();

    expect(userGoal.save.called).equal(true);
    expect(userGoal.basicGoal).equal("increase muscles mass");
    expect(userGoal.detailGoals.musclesMass).equal(10);
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals updated");
  });

  it("should change basicGoal to increase muscles mass and enter muscles mass goal", async () => {
    stubedGoalsModel.returns({
      detailGoals: {},
      basicGoal: "lose fat",
      save: sinon.spy(),
    });

    req.body.musclesMass = 10;

    await goalsController.changeBasicGoal(req as any, res as any, () => {});

    const userGoal = Goals.findOne();

    expect(userGoal.save.called).equal(true);
    expect(userGoal.basicGoal).equal("increase muscles mass");
    expect(userGoal.detailGoals.musclesMass).equal(10);
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals updated");
  });

  it("should change basicGoal to lose fat and enter new fatPercentage field", async () => {
    stubedGoalsModel.returns({
      detailGoals: {},
      basicGoal: "increase muscles mass",
      save: sinon.spy(),
    });

    req.body.fatPercentage = 10;

    await goalsController.changeBasicGoal(req as any, res as any, () => {});

    const userGoal = Goals.findOne();

    expect(userGoal.save.called).equal(true);
    expect(userGoal.basicGoal).equal("lose fat");
    expect(userGoal.detailGoals.fatPercentage).equal(10);
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals updated");
  });

  afterEach(() => {
    stubedGoalsModel.restore();
  });
});

describe("change goals tests", () => {
  const req = {
    userId: "123",
    body: <ReqBody>{},
  };
  const res = createCustomResponseObj();
  let stubedGoalsModel: SinonStub;

  beforeEach(() => {
    stubedGoalsModel = sinon.stub(Goals, "findOne");
  });

  it("send error response if no model was found", async () => {
    stubedGoalsModel.returns(false);

    await goalsController.changeGoals(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Goals have not created yet for this user");
  });

  it("should send error response if no data found", async () => {
    stubedGoalsModel.returns(true);

    await goalsController.changeGoals(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No parameters were provided");
  });

  it("should update weight property in user goals", async () => {
    stubedGoalsModel.returns({ detailGoals: {}, save: sinon.spy() });

    req.body.weight = 1;

    await goalsController.changeGoals(req as any, res as any, () => {});

    const userGoal = Goals.findOne();

    expect(userGoal.save.called).equal(true);
    expect(userGoal.detailGoals.weight).equal(1);
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals updated");
  });

  it("should update fatPercentage property in user goals", async () => {
    stubedGoalsModel.returns({ detailGoals: {}, save: sinon.spy() });

    req.body.fatPercentage = 1;

    await goalsController.changeGoals(req as any, res as any, () => {});

    const userGoal = Goals.findOne();

    expect(userGoal.save.called).equal(true);
    expect(userGoal.detailGoals.fatPercentage).equal(1);
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals updated");
  });

  it("should update musclesMass property in user goals", async () => {
    stubedGoalsModel.returns({ detailGoals: {}, save: sinon.spy() });

    req.body.musclesMass = 1;

    await goalsController.changeGoals(req as any, res as any, () => {});

    const userGoal = Goals.findOne();

    expect(userGoal.save.called).equal(true);
    expect(userGoal.detailGoals.musclesMass).equal(1);
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals updated");
  });

  it("should update all property in user goals", async () => {
    stubedGoalsModel.returns({ detailGoals: {}, save: sinon.spy() });

    req.body.musclesMass = 1;
    req.body.fatPercentage = 2;
    req.body.weight = 3;

    await goalsController.changeGoals(req as any, res as any, () => {});

    const userGoal = Goals.findOne();

    expect(userGoal.save.called).equal(true);
    expect(userGoal.detailGoals.musclesMass).equal(1);
    expect(userGoal.detailGoals.fatPercentage).equal(2);
    expect(userGoal.detailGoals.weight).equal(3);
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Goals updated");
  });

  afterEach(() => {
    stubedGoalsModel.restore();
  });
});
