require("dotenv").config({ path: "./config.env" });

const { expect } = require("chai");

const bcrypt = require("bcryptjs");

const authController = require("../controller/auth");
const { connectDb } = require("../utils/databaseForTest");
const User = require("../models/User");

const afterTests = require("../utils/forTests/afterDefaultFunction");
const fakeResponseObj = require("../utils/forTests/responseDefaultObj");

describe("validateUser tests", function () {
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
          hasProgram: true,
        });
        return user.save();
      })
      .then((savedUser) => {
        user = savedUser;
        req = {
          userId: user._id,
          body: {
            email: "test@test.com",
            password: "testpass123",
          },
        };
        res = fakeResponseObj;

        return authController.validateUser(req, res, () => {});
      })
      .then((_) => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it("should set the right status code in res", () => {
    expect(res.statusCode).equal(200);
  });

  it("should set the right json data in res", () => {
    expect(res.jsonObj.isAuthenticated).equal(true);
    expect(res.jsonObj.username).equal("tester");
    expect(res.jsonObj.hasProgram).equal(true);
    expect(res.jsonObj.hasDiet).equal(false);
    expect(res.jsonObj.userId).eql(user._id);
  });

  after(async () => {
    await afterTests();
  });
});
