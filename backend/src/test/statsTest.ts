import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

import * as statsController from "../controller/stats";
import createCustomResponseObj, {
  ResponseCustomObject,
} from "../utils/helpers/forTests/responseDefaultObj";
import PhysicalStats from "../models/PhysicalStats";
import Goals from "../models/Goals";
import User from "../models/User";
import Sinon from "sinon";

describe("addStats endpoint general tests", () => {
  const res = createCustomResponseObj();
  const req = {
    userId: "123",
    body: {
      weight: 100,
      fatPercentage: 20,
      musclesMass: 30,
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

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("User's goals not found");
  });

  it("should not add stats more then once in 7 days", async () => {
    stubedGoalsModel.returns(true);
    stubedStatsModel.returns({ stats: [{ date: new Date() }] });

    await statsController.addStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("You can only declare stats change once in 7 days");
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
    expect(newStats.musclesMass).equal(30);
    expect(newStats.bodyImageUrl).equal("image");
    expect(user.grade).equal(15);
    expect(user.hasInitialStats).equal(true);
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

describe("addStats endpoint deeply tests", () => {
  const res = createCustomResponseObj();
  const req = {
    userId: "123",
    body: {
      weight: 100,
      fatPercentage: 20,
      musclesMass: 30,
      height: 180,
      bodyImageUrl: "image",
    } as any,
  };
  let stubedGoalsModel: SinonStub;
  let stubedUserModel: SinonStub;
  let stubedStatsModel: SinonStub;
  let stubedDate: SinonStub;
  before(() => {
    stubedDate = sinon.stub(Date.prototype, "getTime");
    stubedDate.returns(Infinity);
  });
  after(() => {
    stubedDate.restore();
  });
  beforeEach(() => {
    stubedGoalsModel = sinon.stub(Goals, "findOne");
    stubedUserModel = sinon.stub(User, "findById");
    stubedStatsModel = sinon.stub(PhysicalStats, "findOne");
    stubedGoalsModel.returns({
      basicGoal: "lose fat",
      detailGoals: { weight: 30, fatPercentage: 5, musclesMass: 100 },
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
      musclesMass: 25,
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
      "Unfortunately you didn't gain more muscles mass this time"
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
      musclesMass: 25,
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
      "Unfortunately you didn't gain more muscles mass this time"
    );
    expect(res.jsonObj.messages.length).equal(2);
    expect(res.jsonObj.accomplishments).eql({});
  });

  it("should add the grade and send messages (musclesMass improved)", async () => {
    const statsArray = <object>[];
    stubedUserModel.returns({ grade: 0, save: sinon.spy() });
    stubedStatsModel.returns({ stats: statsArray, save: sinon.spy() });

    await statsController.addStats(req as any, res as any, () => {});

    req.body = {
      height: 1,
      bodyImageUrl: "",
      weight: 90,
      fatPercentage: 25,
      musclesMass: 30,
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
      musclesMass: 31,
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
      musclesMass: 32,
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
    expect(res.jsonObj.accomplishments.musclesMass).equal(undefined);
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
      musclesMass: 33,
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
    expect(res.jsonObj.accomplishments.musclesMass).equal(undefined);
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
      musclesMass: 100,
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
    expect(res.jsonObj.accomplishments.musclesMass).equal(true);
  });

  afterEach(() => {
    stubedUserModel.restore();
    stubedStatsModel.restore();
    stubedGoalsModel.restore();
  });
});

describe("getAllStatsDates endpoint tests", () => {
  const req = {
    userId: "123",
  };

  let res: ResponseCustomObject;
  let stubedStatsModel: SinonStub;

  beforeEach(() => {
    res = createCustomResponseObj();
    stubedStatsModel = sinon.stub(PhysicalStats, "findOne");
  });

  it("should send error response if no userStats found", async () => {
    stubedStatsModel.returns(false);

    await statsController.getAllStatsDates(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were found for this user");
  });

  it("should send error response if no stats were yet to be created", async () => {
    stubedStatsModel.returns({
      stats: [],
    });

    await statsController.getAllStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were created yet");
  });

  it("should send success response with all the stats", async () => {
    const stats = [
      { data: "data1", moreData: "moreData1", date: 1 },
      { data: "data2", moreData: "moreData2", date: 2 },
      { data: "data3", moreData: "moreData3", date: 3 },
    ];
    stubedStatsModel.returns({
      stats,
    });

    const expectedData = [1, 2, 3];

    await statsController.getAllStatsDates(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.jsonObj.statsDates).eql(expectedData);
  });

  afterEach(() => {
    stubedStatsModel.restore();
  });
});

describe("getStatsByDate endpoint tests", () => {
  const req = {
    userId: "123",
    params: <{ date?: string }>{},
  };

  let res: ResponseCustomObject;

  let stubedStatsModel: SinonStub;

  beforeEach(() => {
    res = createCustomResponseObj();
    stubedStatsModel = sinon.stub(PhysicalStats, "findOne");
  });

  it("should send error response if no userStats found", async () => {
    stubedStatsModel.returns(false);

    await statsController.getStatsByDate(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were found for this user");
  });

  it("should send error response if no stats found by date", async () => {
    stubedStatsModel.returns({
      stats: [{ date: "" }, { date: "11/11/1999" }, { date: "" }],
    });

    req.params.date = "11/11/2001";

    await statsController.getStatsByDate(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Invalid date, no stats were entered at this date");
  });

  it("should send success response with the requested stats", async () => {
    stubedStatsModel.returns({
      stats: [
        { date: "" },
        { moreData: "data", date: "11/11/2001" },
        { date: "" },
      ],
    });

    await statsController.getStatsByDate(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.jsonObj.moreData).equal("data");
    expect(res.jsonObj.date).equal("11/11/2001");
  });

  afterEach(() => {
    stubedStatsModel.restore();
  });
});

describe("getAllStats endpoint tests", () => {
  const req = {
    userId: "123",
  };

  let res: ResponseCustomObject;
  let stubedStatsModel: SinonStub;

  beforeEach(() => {
    res = createCustomResponseObj();
    stubedStatsModel = sinon.stub(PhysicalStats, "findOne");
  });

  it("should send error response if no userStats found", async () => {
    stubedStatsModel.returns(false);

    await statsController.getAllStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were found for this user");
  });

  it("should send error response if no stats were yet to be created", async () => {
    stubedStatsModel.returns({
      stats: [],
    });

    await statsController.getAllStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were created yet");
  });

  it("should send success response with all the stats", async () => {
    const stats = [
      { data: "data1", moreData: "moreData1" },
      { data: "data2", moreData: "moreData2" },
      { data: "data3", moreData: "moreData3" },
    ];
    stubedStatsModel.returns({
      stats,
    });

    await statsController.getAllStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.jsonObj.stats).eql(stats);
  });

  afterEach(() => {
    stubedStatsModel.restore();
  });
});

describe("deleteLastStats endpoint tests", () => {
  const req = {
    userId: "123",
  };

  let res: ResponseCustomObject;
  let stubedStatsModel: SinonStub;

  beforeEach(() => {
    res = createCustomResponseObj();
    stubedStatsModel = sinon.stub(PhysicalStats, "findOne");
  });

  it("should send error response if no userStats found", async () => {
    stubedStatsModel.returns(false);

    await statsController.deleteLastStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were found for this user");
  });

  it("should send error response if no stats were yet to be created", async () => {
    stubedStatsModel.returns({
      stats: [],
    });

    await statsController.deleteLastStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were created yet");
  });

  it("should send error response if stats were created over 24 hours ago", async () => {
    stubedStatsModel.returns({
      stats: [{ date: new Date().getTime() - 100 * 60 * 60 * 25 }],
    });

    await statsController.deleteLastStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "It's been over 24 hours since the last stats were created, You can't delete them"
    );
  });

  it("should send success response and delete the last stats", async () => {
    stubedStatsModel.returns({
      save: sinon.spy(),
      stats: [{ data: "first data" }, { data: "last data", date: new Date() }],
    });

    await statsController.deleteLastStats(req as any, res as any, () => {});

    const userStats = PhysicalStats.findOne();
    const lastStatsIndex = userStats.stats.length - 1;
    const lastStats = userStats.stats[lastStatsIndex];

    expect(lastStats.data).equal("first data");
    expect(userStats.save.called).equal(true);
    expect(res.statusCode).equal(200);
    expect(res.msg).equal("The last stats were deleted");
  });

  afterEach(() => {
    stubedStatsModel.restore();
  });
});

describe("changeLastStats endpoint tests", () => {
  const req = {
    userId: "123",
    body: <any>{},
  };

  let res: ResponseCustomObject;
  let stubedStatsModel: SinonStub;

  beforeEach(() => {
    res = createCustomResponseObj();
    stubedStatsModel = sinon.stub(PhysicalStats, "findOne");
  });

  it("should send error response if no userStats found", async () => {
    stubedStatsModel.returns(false);

    await statsController.changeLastStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were found for this user");
  });

  it("should send error response if no stats were yet to be created", async () => {
    stubedStatsModel.returns({
      stats: [],
    });

    await statsController.changeLastStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No stats were created yet");
  });

  it("should send error response if stats were created over 24 hours ago", async () => {
    stubedStatsModel.returns({
      stats: [{ date: new Date().getTime() - 100 * 60 * 60 * 25 }],
    });

    await statsController.changeLastStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "It's been over 24 hours since the last stats were created, You can't change them"
    );
  });

  it("should send error response if no data was sent", async () => {
    stubedStatsModel.returns({
      stats: [{ date: new Date() }],
    });

    await statsController.changeLastStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("No data was provided");
  });

  it("should change the last stats and send success response", async () => {
    stubedStatsModel.returns({
      save: sinon.spy(),
      stats: [{ data: "data" }, { date: new Date() }],
    });
    req.body.weight = 1;
    req.body.height = 2;
    req.body.fatPercentage = 3;
    req.body.musclesMass = 4;
    req.body.bodyImageUrl = "image";
    await statsController.changeLastStats(req as any, res as any, () => {});

    const userStats = PhysicalStats.findOne();
    const lastStatsIndex = userStats.stats.length - 1;
    const lastStats = userStats.stats[lastStatsIndex];

    expect(lastStats.weight).equal(1);
    expect(lastStats.height).equal(2);
    expect(lastStats.fatPercentage).equal(3);
    expect(lastStats.musclesMass).equal(4);
    expect(lastStats.bodyImageUrl).equal("image");
    expect(userStats.save.called).equal(true);
  });

  it("should send success response and change the last stats", async () => {
    stubedStatsModel.returns({
      save: sinon.spy(),
      stats: [{ data: "data" }, { date: new Date() }],
    });
    req.body.weight = 1;

    await statsController.changeLastStats(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.msg).equal("The last stats were updated");
  });

  afterEach(() => {
    stubedStatsModel.restore();
  });
});

describe("set ranks tests", () => {
  const req = { userId: "123", body: { selfRank: "new rank" } as any };
  const res = createCustomResponseObj();
  let stubedStats: SinonStub;

  before(() => {
    stubedStats = sinon.stub(PhysicalStats, "findOne");
  });

  it("should send an error response if physical stats was not found", async () => {
    stubedStats.returns(false);

    await statsController.setRanking(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "Something went wrong... Couldn't find stats that match the user"
    );
  });

  it("should save the new rank", async () => {
    stubedStats.returns({ save: sinon.spy() });

    await statsController.setRanking(req as any, res as any, () => {});

    const stats = await PhysicalStats.findOne();

    expect(stats.rank).equal("new rank");
    expect(stats.save.called).equal(true);
  });

  it("should send a success response", () => {
    expect(res.statusCode).equal(201);
    expect(res.msg).equal("Ranking the user successfully");
  });

  after(() => {
    stubedStats.restore();
  });
});
