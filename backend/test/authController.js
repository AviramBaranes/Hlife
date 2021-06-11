require("dotenv").config({ path: "./config.env" });

const { expect } = require("chai");

const { connectDb, disconnectDb } = require("../utils/databaseForTest");
const authController = require("../controller/auth");
const User = require("../models/User");
const PhysicalStats = require("../models/PhysicalStats");
const Diet = require("../models/Diet");
const DietExecution = require("../models/DietExecution");
const Program = require("../models/Program");
const ProgramExecution = require("../models/ProgramExecution");

describe("signupController error handling", function () {
  beforeEach(function (done) {
    connectDb().then((_) => {
      const user = new User({
        name: "tester",
        username: "tester",
        email: "test@test.com",
        password: "testpass123",
        passwordConfirmation: "testpass123",
        gender: "male",
        dateOfBirth: "02/01/2000",
      });
      user.save().then((_) => {
        done();
      });
    });
  });

  it("should throw an error if user exist", async function () {
    req = {
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

    res = {
      statusCode: 500,
      message: "",
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      send: function (message) {
        this.message = message;
      },
    };

    await authController.signup(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.message).equal("user already exist with this email!");
  });

  it("should throw an error if password do not match", async function () {
    req = {
      body: {
        name: "Avirambr",
        username: "aviramSport2",
        email: "test2@test.com",
        password: "testpass1234",
        passwordConfirmation: "testpass123",
        gender: "male",
        dateOfBirth: "02/01/2000",
      },
    };

    res = {
      statusCode: 500,
      message: "",
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      send: function (message) {
        this.message = message;
      },
    };

    await authController.signup(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.message).equal("passwords do not match");
  });

  afterEach(async function () {
    await User.deleteMany({});
    await disconnectDb();
  });
});

describe("signupController creating the correct models", function () {
  before(function (done) {
    let mainUser;
    let dietModel;
    connectDb().then((_) => {
      const res = {
        statusCode: 500,
        message: "",
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        send: function (message) {
          this.message = message;
        },
        cookie: function () {
          return this;
        },
      };
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

      authController
        .signup(req, res, () => {})
        .then(() => {
          done();
        });
    });
  });

  it("should create a user model", async () => {
    mainUser = await User.findOne({ email: "test2@test.com" });

    expect(mainUser._id).to.be.an("object");
    expect(mainUser.name).equal("Avirambr");
    expect(mainUser.username).equal("aviramSport2");
    expect(mainUser.email).equal("test2@test.com");
    expect(mainUser.gender).equal("male");
    expect(mainUser.grade).equal(0);
    expect(mainUser.dateOfBirth).eql(new Date("02/01/2000"));
  });

  it("should create a PhysicalStats model", async () => {
    const physicalStats = await PhysicalStats.findOne({ user: mainUser._id });

    expect(physicalStats._id).to.be.an("object");
    expect(physicalStats.user).eql(mainUser._id);
    expect(physicalStats.age).equal(2021 - 2000);
    expect(physicalStats.stats).eql([]);
  });

  it("should create a Diet model", async () => {
    dietModel = await Diet.findOne({ user: mainUser._id });

    expect(dietModel._id).to.be.an("object");
    expect(dietModel.user).eql(mainUser._id);
    expect(dietModel.ingredients).eql([]);
  });

  it("should create a Program model", async () => {
    const program = await Program.findOne({ user: mainUser._id });

    expect(program._id).to.be.an("object");
    expect(program.user).eql(mainUser._id);
    expect(program.goals).haveOwnProperty("weight");
    expect(program.goals).haveOwnProperty("muscelesMass");
    expect(program.goals).haveOwnProperty("fatPercentage");
    expect(program.goals).haveOwnProperty("date");
    expect(program.program).eql([]);
  });

  it("should create a ProgramExecution model", async () => {
    const programExecution = await ProgramExecution.findOne({
      user: mainUser._id,
    });

    expect(programExecution._id).to.be.an("object");
    expect(programExecution.user).eql(mainUser._id);
    expect(programExecution.executions).eql([]);
  });

  it("should create a UserDietExecution model", async () => {
    const userDietExecution = await DietExecution.findOne({
      user: mainUser._id,
    });

    expect(userDietExecution._id).to.be.an("object");
    expect(userDietExecution.user).eql(mainUser._id);
    expect(userDietExecution.diet).eql(dietModel._id);
    expect(userDietExecution.executions).eql([]);
  });

  after(async () => {
    await User.deleteMany({});
    await disconnectDb();
  });
});
