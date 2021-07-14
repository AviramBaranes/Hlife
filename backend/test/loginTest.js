require("dotenv").config({ path: "./config.env" });

//test tools
const { expect } = require("chai");
const sinon = require("sinon");

//packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//controller to test
const authController = require("../controller/auth");

//models and connections
const { connectDb } = require("../utils/databaseForTest");
const User = require("../models/User");

//utils
const afterTests = require("../utils/forTests/afterDefaultFunction");
const fakeResponseObj = require("../utils/forTests/responseDefaultObj");
const fakeUserCreation = require("../utils/forTests/createTempUser");

describe("login controller error handling tests", function () {
  let req, res;
  it("should return an error response if email not exist", async function () {
    req = {
      body: { email: "fakeEmail@fake.com", password: "123456" },
    };

    res = fakeResponseObj();

    const stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns({
      select: sinon.stub().returns(false),
    });

    await authController.login(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("User not found, Make sure the email is correct");

    stubedUser.restore();
  });

  it("should return an error response if password is incorrect", async function () {
    req = {
      body: {
        email: "test@test.com",
        password: "123456",
      },
    };

    const stubedUser = sinon.stub(User, "findOne");
    const stubedBcrypt = sinon.stub(bcrypt, "compare");

    stubedUser.returns({
      select: sinon.stub().returns(true),
    });
    stubedBcrypt.returns(false);

    await authController.login(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("Password is invalid");

    stubedUser.restore();
    stubedBcrypt.restore();
  });

  it("should throw a default error", async function () {
    const stubedUser = sinon.stub(User, "findOne");
    stubedUser.throws();

    const error = await authController.login(req, {}, () => {});

    expect(error.statusCode).equal(500);

    stubedUser.restore();
  });
});

describe("login controller testing response", function () {
  let res, req;

  it("should return 200 status code", async () => {
    req = {
      body: {
        email: "test@test.com",
        password: "123456",
      },
    };
    res = fakeResponseObj();

    const stubedUser = sinon.stub(User, "findOne");
    const stubedBcrypt = sinon.stub(bcrypt, "compare");

    stubedUser.returns({
      select: sinon.stub().returns({
        name: "aviram",
        _id: 1,
        username: "avi123",
        hasProgram: true,
        hasDiet: false,
      }),
    });
    stubedBcrypt.returns(true);

    await authController.login(req, res, () => {});

    expect(res.statusCode).equal(200);

    stubedUser.restore();
    stubedBcrypt.restore();
  });

  it("should return the correct cookie", () => {
    const { userId } = jwt.verify(res.cookieToken, process.env.jwtSecret);
    expect(res.cookieName).equal("jon");
    expect(userId).equal(1);
  });

  it("should return the correct cookie settings", function () {
    expect(res.cookieConfig.sameSite).equal("strict");
    expect(res.cookieConfig.path).equal("/");
    const currentDate = new Date(new Date().getTime() + 24 * 3600 * 1000 * 2);
    const currentTime = currentDate.getTime();
    const cookieExperetionTime = res.cookieConfig.expires.getTime();
    expect(cookieExperetionTime).below(currentTime);
    expect(res.cookieConfig.httpOnly).equal(true);
  });
  it("should send the correct message and data", function () {
    expect(res.jsonObj.message).equal("aviram Logged In Successfully!");
    expect(res.jsonObj.username).equal("avi123");
    expect(res.jsonObj.hasProgram).equal(true);
    expect(res.jsonObj.hasDiet).equal(false);
  });
});
