require("dotenv").config({ path: "./config.env" });

//test tools
const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");

//packages
const jwt = require("jsonwebtoken");

//controller to test
const authController = require("../controller/auth");

//models and connections
const User = require("../models/User");
const PhysicalStats = require("../models/PhysicalStats");
const Diet = require("../models/Diet");
const DietExecution = require("../models/DietExecution");
const Program = require("../models/Program");
const ProgramExecution = require("../models/ProgramExecution");

const fakeResponseObj = require("../utils/forTests/responseDefaultObj");

let stubedPhysicalStats,
  stubedDietExecution,
  stubedProgramExecution,
  stubedProgram,
  stubedBcrypt,
  stubedDietModel;

describe("signup Controller error handling", function () {
  let req, stubedUser;
  const res = fakeResponseObj();

  it("should throw an error if user exist", async function () {
    req = {
      body: {
        name: "Avirambr",
        username: "aviramSport2",
        email: "test@test.com",
        password: "testpass123",
        passwordConfirmation: "testpass12",
        gender: "male",
        dateOfBirth: "02/01/2000",
      },
    };

    stubedUser = sinon.stub(User, "findOne");
    stubedUser.returns(true);

    await authController.signup(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("user already exist with this email!");
  });

  it("should throw an error if password do not match", async function () {
    stubedUser.returns(false);

    await authController.signup(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("passwords do not match");
  });

  it("should throw a default error", async function () {
    const error = await authController.signup({}, {}, () => {});

    expect(error.statusCode).equal(500);

    stubedUser.restore();
  });
});

describe("signup Controller creating the correct models", function () {
  let stubedUser, stubedUserPrototype;
  let createdUserArgs,
    createdPhysicalStatsArgs,
    createdDietArgs,
    createdProgramArgs,
    createdProgramExecutionArgs,
    createdDietExecutionArgs;
  before(async () => {
    const res = fakeResponseObj();
    const req = {
      body: {
        name: "Avirambr",
        username: "aviramSport2",
        email: "test2@test.com",
        password: "testpass123",
        passwordConfirmation: "testpass123",
        gender: "male",
        dateOfBirth: "02/01/2000",
      },
    };

    stubedPhysicalStats = sinon.stub(PhysicalStats.prototype, "save");
    stubedDietExecution = sinon.stub(DietExecution.prototype, "save");
    stubedProgramExecution = sinon.stub(ProgramExecution.prototype, "save");
    stubedProgram = sinon.stub(Program.prototype, "save");
    stubedBcrypt = sinon.stub(bcrypt, "hash");
    stubedDietModel = sinon.stub(Diet.prototype, "save");

    stubedUser = sinon.stub(User, "findOne");
    stubedUserPrototype = sinon.stub(User.prototype, "save");

    stubedBcrypt.returns("123456");
    stubedUser.returns(false);
    stubedUserPrototype.returns({ _id: 1 });
    stubedDietModel.returns({ _id: 1 });

    await authController.signup(req, res, () => {});

    createdUserArgs = stubedUserPrototype.firstCall.thisValue;
    createdPhysicalStatsArgs = stubedPhysicalStats.firstCall.thisValue;
    createdDietArgs = stubedDietModel.firstCall.thisValue;
    createdProgramArgs = stubedProgram.firstCall.thisValue;
    createdProgramExecutionArgs = stubedProgramExecution.firstCall.thisValue;
    createdDietExecutionArgs = stubedDietExecution.firstCall.thisValue;
  });

  it("should create a user model with the right arguments", async () => {
    expect(createdUserArgs._id).to.be.an("object");
    expect(createdUserArgs.name).equal("Avirambr");
    expect(createdUserArgs.username).equal("aviramSport2");
    expect(createdUserArgs.email).equal("test2@test.com");
    expect(createdUserArgs.gender).equal("male");
    expect(createdUserArgs.grade).equal(0);
    expect(createdUserArgs.dateOfBirth).eql(new Date("02/01/2000"));
  });

  it("should create a PhysicalStats model", async () => {
    expect(createdPhysicalStatsArgs._id).to.be.an("object");
    expect(createdPhysicalStatsArgs.user).eql(createdUserArgs._id);
    expect(createdPhysicalStatsArgs.age).equal(2021 - 2000);
    expect(createdPhysicalStatsArgs.stats).eql([]);
  });

  it("should create a Diet model", async () => {
    expect(createdDietArgs._id).to.be.an("object");
    expect(createdDietArgs.user).eql(createdUserArgs._id);
    expect(createdDietArgs.ingredients).eql([]);
  });

  it("should create a Program model", async () => {
    expect(createdProgramArgs._id).to.be.an("object");
    expect(createdProgramArgs.user).eql(createdUserArgs._id);
    expect(createdProgramArgs.goals).haveOwnProperty("weight");
    expect(createdProgramArgs.goals).haveOwnProperty("muscelesMass");
    expect(createdProgramArgs.goals).haveOwnProperty("fatPercentage");
    expect(createdProgramArgs.goals).haveOwnProperty("date");
    expect(createdProgramArgs.program).eql([]);
  });

  it("should create a ProgramExecution model", async () => {
    expect(createdProgramExecutionArgs._id).to.be.an("object");
    expect(createdProgramExecutionArgs.user).eql(createdUserArgs._id);
    expect(createdProgramExecutionArgs.executions).eql([]);
  });

  it("should create a UserDietExecution model", async () => {
    expect(createdDietExecutionArgs._id).to.be.an("object");
    expect(createdDietExecutionArgs.user).eql(createdUserArgs._id);
    expect(createdDietExecutionArgs.diet).eql(createdDietArgs._id);
    expect(createdDietExecutionArgs.executions).eql([]);
  });

  after(() => {
    stubedUser.restore();
    stubedUserPrototype.restore();
  });
});

describe("signup controller testing respones", function () {
  let stubedUser, stubedUserPrototype;
  const req = {
    body: {
      name: "Avirambr",
      username: "aviramSport2",
      email: "test@test.com",
      password: "testpass123",
      passwordConfirmation: "testpass123",
      gender: "male",
      dateOfBirth: "02/01/2000",
    },
  };

  const res = fakeResponseObj();

  before(async () => {
    stubedUser = sinon.stub(User, "findOne");
    stubedUserPrototype = sinon.stub(User.prototype, "save");
    stubedUser.returns(false);
    stubedUserPrototype.returns({ _id: 1 });
    await authController.signup(req, res, () => {});
  });

  it("should send the correct response", function () {
    expect(res.statusCode).equal(200);
  });

  it("should set the correct cookie name", function () {
    expect(res.cookieName).equal("jon");
  });

  it("should set the correct token", async function () {
    const userData = stubedUserPrototype.firstCall.thisValue;
    const tokenTester = jwt.verify(res.cookieToken, process.env.jwtSecret);

    expect(tokenTester.userId).equal(userData._id.toString());
  });

  it("should set the correct cookie configs", function () {
    expect(res.cookieConfig.sameSite).equal("strict");
    expect(res.cookieConfig.path).equal("/");
    const currentDate = new Date(new Date().getTime() + 24 * 3600 * 1000 * 2);
    const currentTime = currentDate.getTime();
    const cookieExperetionTime = res.cookieConfig.expires.getTime();
    expect(cookieExperetionTime).below(currentTime);
    expect(res.cookieConfig.httpOnly).equal(true);
  });

  it("should send the correct message and data", function () {
    expect(res.jsonObj.message).equal("Avirambr Sign Up Successfully");
    expect(res.jsonObj.username).equal("aviramSport2");
  });

  after(() => {
    stubedPhysicalStats.restore();
    stubedDietExecution.restore();
    stubedProgramExecution.restore();
    stubedProgram.restore();
    stubedBcrypt.restore();
    stubedDietModel.restore();
  });
});
