require("dotenv").config({ path: "./config.env" });

//test tools
const { expect } = require("chai");
const sinon = require("sinon");

//packages
const jwt = require("jsonwebtoken");

//controller to test
const authController = require("../controller/auth");

//models and connections
const { connectDb, disconnectDb } = require("../utils/databaseForTest");
const User = require("../models/User");
const PhysicalStats = require("../models/PhysicalStats");
const Diet = require("../models/Diet");
const DietExecution = require("../models/DietExecution");
const Program = require("../models/Program");
const ProgramExecution = require("../models/ProgramExecution");

const afterTests = require("../utils/forTests/afterDefaultFunction");
const fakeResponseObj = require("../utils/forTests/responseDefaultObj");

describe("signup Controller error handling", function () {
  let req, res;
  beforeEach(function (done) {
    connectDb()
      .then((_) => {
        const user = new User({
          name: "tester",
          username: "tester",
          email: "test@test.com",
          password: "testpass123",
          passwordConfirmation: "testpass123",
          gender: "male",
          dateOfBirth: "02/01/2000",
        });
        user
          .save()
          .then((_) => {
            done();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
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

    res = fakeResponseObj;

    await authController.signup(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("user already exist with this email!");
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

    res = fakeResponseObj;

    await authController.signup(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("passwords do not match");
  });

  it("should throw a default error", async function () {
    const stub = sinon.stub(User, "findOne");

    stub.throws("Server Error");

    const error = await authController.signup(req, {}, () => {});

    expect(error.statusCode).equal(500);

    stub.restore();
  });

  afterEach(async function () {
    await User.deleteMany({});
    await disconnectDb();
  });
});

describe("signup Controller creating the correct models", function () {
  let mainUser;
  let dietModel;
  before(function (done) {
    connectDb()
      .then((_) => {
        const res = fakeResponseObj;
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
      })
      .catch((err) => {
        console.log(err);
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
    await afterTests();
  });
});

describe("signup controller testing respones", function () {
  let res, req;
  before((done) => {
    connectDb()
      .then((_) => {
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

        res = fakeResponseObj;

        authController
          .signup(req, res, () => {})
          .then((_) => {
            done();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it("should send the correct response", function () {
    expect(res.statusCode).equal(200);
  });

  it("should set the correct cookie name", function () {
    expect(res.cookieName).equal("jon");
  });

  it("should set the correct token", async function () {
    const user = await User.findOne({ name: "Avirambr" });
    const tokenTester = jwt.verify(res.cookieToken, process.env.jwtSecret);
    expect(tokenTester.userId).equal(user._id.toString());
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

  it("should send the correct message", function () {
    expect(res.msg).equal("Avirambr Sign Up Successfully");
  });

  after(async () => {
    await afterTests();
  });
});
