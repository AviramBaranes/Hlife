const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");

const authController = require("../controller/auth");

const { connectDb } = require("../utils/databaseForTest");
const User = require("../models/User");

const afterTests = require("../utils/forTests/afterDefaultFunction");

describe("resetPassword in settings tests", function () {
  let userForTests, req, res, passwordForTest;
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
          .then((savedUser) => {
            userForTests = savedUser;
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

  it("should response with 403", async function () {
    req = {
      body: {
        userId: userForTests._id,
        currentPassword: null,
        newPassword: "1234567",
        newPasswordConfirmation: "not match",
      },
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

    await authController.resetPassword(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Passwords do not match");
  });

  it("should fail to compare passwords", async function () {
    req.body.currentPassword = "not correct";
    req.body.newPasswordConfirmation = "1234567";

    await authController.resetPassword(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Password is invalid");
  });

  it("should change user password and send correct response", async function () {
    req.body.currentPassword = "testpass123";

    await authController.resetPassword(req, res, () => {});

    const user = await User.findById(userForTests._id).select("+password");

    const isMatch = await bcrypt.compare("1234567", user.password);

    expect(isMatch).equal(true);
    expect(res.statusCode).equal(200);
    expect(res.msg).equal("password reseted successfully!");
  });

  after(async () => {
    await afterTests();
  });
});
