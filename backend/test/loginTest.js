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

const afterTests = require("../utils/forTests/afterDefaultFunction");

describe("login controller error handling tests", function () {
  let req, res;
  before((done) => {
    connectDb()
      .then((_) => {
        return bcrypt.hash("testpass123", 10);
      })
      .then((hashedPassword) => {
        const user = new User({
          name: "tester",
          username: "tester",
          email: "test@test.com",
          password: hashedPassword,
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

  it("should return an error response if email not exist", async function () {
    req = {
      body: { email: "fakeEmail@fake.com", password: "123456" },
    };

    res = {
      statusCode: null,
      msg: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(msg) {
        this.msg = msg;
      },
    };

    await authController.login(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("User not find");
  });

  it("should return an error response if password is incorrect", async function () {
    req = {
      body: {
        email: "test@test.com",
        password: "123456",
      },
    };

    await authController.login(req, res, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("Password is invalid");
  });

  it("should throw a default error", async function () {
    const stubedUser = sinon.stub(User, "findOne");
    stubedUser.throws();

    const error = await authController.login(req, {}, () => {});

    expect(error.statusCode).equal(500);

    stubedUser.restore();
  });

  after(async () => {
    await afterTests();
  });
});

describe("login controller testing response", function () {
  let res, req, user;
  before((done) => {
    connectDb()
      .then((_) => {
        return bcrypt.hash("testpass123", 10);
      })
      .then((hashedPassword) => {
        const user = new User({
          name: "tester",
          username: "tester",
          email: "test@test.com",
          password: hashedPassword,
          gender: "male",
          dateOfBirth: "02/01/2000",
        });
        return user.save();
      })
      .then((savedUser) => {
        user = savedUser;
        req = {
          body: {
            email: "test@test.com",
            password: "testpass123",
          },
        };
        res = {
          statusCode: null,
          cookieName: null,
          cookieToken: null,
          cookieConfig: {},
          msg: "",
          status(code) {
            this.statusCode = code;
            return this;
          },
          cookie(name, token, config) {
            this.cookieName = name;
            this.cookieToken = token;
            this.cookieConfig = config;
            return this;
          },
          send(msg) {
            this.msg = msg;
          },
        };
        return authController.login(req, res, () => {});
      })
      .then((_) => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it("should return 200 status code", () => {
    expect(res.statusCode).equal(200);
  });

  it("should return the correct cookie", () => {
    const { userId } = jwt.verify(res.cookieToken, process.env.jwtSecret);
    expect(res.cookieName).equal("joh");
    expect(userId).equal(user._id.toString());
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

  after(async () => {
    await afterTests();
  });
});
