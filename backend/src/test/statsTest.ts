import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

import * as statsController from "../controller/stats";
import createCustomResponseObj from "../utils/helpers/forTests/responseDefaultObj";
import PhysicalStats from "../models/PhysicalStats";
import Goals from "../models/Goals";
import User from "../models/User";

describe("Stats controller general tests", () => {
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
    stubedStatsModel.returns({ stats: [], save: sinon.spy() });
    stubedGoalsModel.returns(true);
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    const user = User.findById({} as any);
    const stats = PhysicalStats.findOne();
    const newStats = stats.stats[0];

    expect(newStats.date).instanceOf(Date);
    expect(newStats.deservedGrade).equal(15);
    expect(newStats.weight).equal(100);
    expect(newStats.height).equal(180);
    expect(newStats.fatPercentage).equal(20);
    expect(newStats.muscelesMass).equal(30);
    expect(newStats.bodyImageUrl).equal("image");
    expect(user.grade).equal(15);
    expect(user.save.called).equal(true);
    expect(stats.stats.length).equal(1);
    expect(stats.save.called).equal(true);
  });

  it("should return the right response", () => {
    const data = res.jsonObj;
    expect(res.statusCode).equal(201);
    expect(data.messages).eql([]);
    expect(data.currentGrade).equal(15);
    expect(data.messages).eql([]);
    expect(data.accomplishments).eql({});
  });
  afterEach(() => {
    stubedUserModel.restore();
    stubedStatsModel.restore();
    stubedGoalsModel.restore();
  });
});

describe("Stats controller deeply tests", () => {
  const res = createCustomResponseObj();
  const req = {
    userId: "123",
    body: {
      weight: 100,
      fatPercentage: 20,
      muscelesMass: 30,
      height: 180,
      bodyImageUrl: "image",
    } as any,
  };
  let stubedGoalsModel: SinonStub;
  let stubedUserModel: SinonStub;
  let stubedStatsModel: SinonStub;
  beforeEach(() => {
    stubedGoalsModel = sinon.stub(Goals, "findOne");
    stubedUserModel = sinon.stub(User, "findById");
    stubedStatsModel = sinon.stub(PhysicalStats, "findOne");
    stubedGoalsModel.returns({
      basicGoals: "lose weight",
      detailGoals: { weight: 30, fatPercentage: 5, muscelesMass: 100 },
    });
  });

  it("should add the grade and send messages", async () => {
    const statsArray = <object>[];
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });
    stubedStatsModel.returns({ stats: statsArray, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    req.body = {
      height: 1,
      bodyImageUrl: "",
      weight: 110,
      fatPercentage: 25,
      muscelesMass: 25,
    };

    await statsController.addStats(req as any, res as any, () => {});

    const user = User.findById({} as any);
    const stats = PhysicalStats.findOne();

    expect(res.statusCode).equal(201);
    expect(user.grade).equal(30);
    expect(user.save.called).equal(true);
    expect(stats.stats.length).equal(2);
    expect(stats.save.called).equal(true);
    expect(res.jsonObj.messages[0]).equal(
      "Unfortunately you didn't reduced your fat percentage this time"
    );
    expect(res.jsonObj.messages[1]).equal(
      "Unfortunately you didn't gain more musceles mass this time"
    );
    expect(res.jsonObj.messages[2]).equal("You failed to lose weight");
    expect(res.jsonObj.accomplishments).eql({});
  });

  it("should add the grade and send messages (weight improved)", async () => {
    const statsArray = <object>[];
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });
    stubedStatsModel.returns({ stats: statsArray, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    req.body = {
      height: 1,
      bodyImageUrl: "",
      weight: 100,
      fatPercentage: 25,
      muscelesMass: 25,
    };

    await statsController.addStats(req as any, res as any, () => {});

    const user = User.findById({} as any);
    const stats = PhysicalStats.findOne();

    expect(res.statusCode).equal(201);
    expect(user.grade).equal(35);
    expect(user.save.called).equal(true);
    expect(stats.stats.length).equal(2);
    expect(stats.save.called).equal(true);
    expect(res.jsonObj.messages[0]).equal(
      "Unfortunately you didn't reduced your fat percentage this time"
    );
    expect(res.jsonObj.messages[1]).equal(
      "Unfortunately you didn't gain more musceles mass this time"
    );
    expect(res.jsonObj.messages.length).equal(2);
    expect(res.jsonObj.accomplishments).eql({});
  });

  it("should add the grade and send messages (muscelesMass improved)", async () => {
    const statsArray = <object>[];
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });
    stubedStatsModel.returns({ stats: statsArray, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    req.body = {
      height: 1,
      bodyImageUrl: "",
      weight: 90,
      fatPercentage: 25,
      muscelesMass: 30,
    };

    await statsController.addStats(req as any, res as any, () => {});

    const user = User.findById({} as any);
    const stats = PhysicalStats.findOne();

    expect(res.statusCode).equal(201);
    expect(user.grade).equal(40);
    expect(user.save.called).equal(true);
    expect(stats.save.called).equal(true);
    expect(res.jsonObj.messages[0]).equal(
      "Unfortunately you didn't reduced your fat percentage this time"
    );
    expect(res.jsonObj.messages.length).equal(1);
    expect(res.jsonObj.accomplishments).eql({});
  });

  it("should add the grade and send messages (all improved)", async () => {
    const statsArray = <object>[];
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });
    stubedStatsModel.returns({ stats: statsArray, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    req.body = {
      height: 1,
      bodyImageUrl: "",
      weight: 88,
      fatPercentage: 20,
      muscelesMass: 31,
    };

    await statsController.addStats(req as any, res as any, () => {});

    const user = User.findById({} as any);
    const stats = PhysicalStats.findOne();

    expect(res.statusCode).equal(201);
    expect(user.grade).equal(45);
    expect(user.save.called).equal(true);
    expect(stats.save.called).equal(true);
    expect(res.jsonObj.messages.length).equal(0);
    expect(res.jsonObj.accomplishments).eql({});
  });

  it("should add the grade and send messages (weight reached goal)", async () => {
    const statsArray = <object>[];
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });
    stubedStatsModel.returns({ stats: statsArray, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    req.body = {
      height: 1,
      bodyImageUrl: "",
      weight: 30,
      fatPercentage: 19,
      muscelesMass: 32,
    };

    await statsController.addStats(req as any, res as any, () => {});

    const user = User.findById({} as any);
    const stats = PhysicalStats.findOne();

    expect(res.statusCode).equal(201);
    expect(user.grade).equal(50);
    expect(user.save.called).equal(true);
    expect(stats.save.called).equal(true);
    expect(res.jsonObj.messages.length).equal(0);
    expect(res.jsonObj.accomplishments.weight).equal(true);
    expect(res.jsonObj.accomplishments.fatPercentage).equal(undefined);
    expect(res.jsonObj.accomplishments.muscelesMass).equal(undefined);
  });

  it("should add the grade and send messages (fatPercentage reached goal)", async () => {
    const statsArray = <object>[];
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });
    stubedStatsModel.returns({ stats: statsArray, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    req.body = {
      height: 1,
      bodyImageUrl: "",
      weight: 29,
      fatPercentage: 5,
      muscelesMass: 33,
    };

    await statsController.addStats(req as any, res as any, () => {});

    const user = User.findById({} as any);
    const stats = PhysicalStats.findOne();

    expect(res.statusCode).equal(201);
    expect(user.grade).equal(55);
    expect(user.save.called).equal(true);
    expect(stats.save.called).equal(true);
    expect(res.jsonObj.messages.length).equal(0);
    expect(res.jsonObj.accomplishments.weight).equal(true);
    expect(res.jsonObj.accomplishments.fatPercentage).equal(true);
    expect(res.jsonObj.accomplishments.muscelesMass).equal(undefined);
  });

  it("should add the grade and send messages (fatPercentage reached goal)", async () => {
    const statsArray = <object>[];
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });
    stubedStatsModel.returns({ stats: statsArray, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    req.body = {
      height: 1,
      bodyImageUrl: "",
      weight: 28,
      fatPercentage: 4,
      muscelesMass: 100,
    };

    await statsController.addStats(req as any, res as any, () => {});

    const user = User.findById({} as any);
    const stats = PhysicalStats.findOne();

    expect(res.statusCode).equal(201);
    expect(user.grade).equal(60);
    expect(user.save.called).equal(true);
    expect(stats.save.called).equal(true);
    expect(res.jsonObj.messages.length).equal(0);
    expect(res.jsonObj.accomplishments.weight).equal(true);
    expect(res.jsonObj.accomplishments.fatPercentage).equal(true);
    expect(res.jsonObj.accomplishments.muscelesMass).equal(true);
  });

  afterEach(() => {
    stubedUserModel.restore();
    stubedStatsModel.restore();
    stubedGoalsModel.restore();
  });
});
