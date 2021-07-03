require("dotenv").config({ path: "./config.env" });

const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");

const authController = require("../controller/auth");

const { connectDb } = require("../utils/databaseForTest");
const User = require("../models/User");

const afterTests = require("../utils/forTests/afterDefaultFunction");
const fakeResponseObj = require("../utils/forTests/responseDefaultObj");

describe("resetPassword in settings tests", function () {
  let userForTests, req, res;
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

    res = fakeResponseObj;

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

describe("sentResetEmail tests", function () {
  let userForTests, req, res;
  req = {
    body: { email: "fakeEmail@fake.com" },
    headers: { cookie: "not a csrf cookie" },
  };

  res = fakeResponseObj;

  before((done) => {
    connectDb()
      .then((_) => {
        const user = new User({
          name: "tester",
          username: "tester",
          email: "test@test.com",
          password: "123456",
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
  it("should send a csrf error", async function () {
    await authController.sentResetEmail(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("CSRF ERROR");
  });

  it("should send a User error", async function () {
    req.headers.cookie = "XSRF-TOKEN=123";

    await authController.sentResetEmail(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("User not found, Make sure the email is correct");
  });

  it("should set a reset token", async function () {
    req.body.email = userForTests.email;

    await authController.sentResetEmail(req, res, () => {});

    const user = await User.findOne({ email: userForTests.email });

    expect(user.resetToken.length).equal(64);
    expect(user.tokenExpiration).below(new Date(Date.now() + 3600000));
  });

  it("should response 200", async function () {
    expect(res.statusCode).equal(200);
    expect(res.msg).equal("Reset Email Sent!");
  });

  after(async () => {
    await afterTests();
  });
});

describe("resetPasswordViaToken tests", function () {
  let req, res, userForTests, updatedUserForTests;
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
  before((done) => {
    connectDb()
      .then((_) => {
        const user = new User({
          name: "tester",
          username: "tester",
          email: "test@test.com",
          password: "123456",
          gender: "male",
          dateOfBirth: "02/01/2000",
          resetToken: "123456",
          tokenExpiration: Date.now() - 3600000, //expired
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

  it("should send error response for not matching passwords", async function () {
    req = {
      params: { resetToken: "not match" },
      body: { password: "they are", passwordConfirmation: "not a match" },
    };

    await authController.resetPasswordViaToken(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Passwords do not match");
  });

  it("should send error response for wrong token", async function () {
    req.body = {
      password: "they match",
      passwordConfirmation: "they match",
      resetToken: "fake token",
    };

    await authController.resetPasswordViaToken(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Invalid Token");
  });

  it("should send error response for expired token", async function () {
    req.body = {
      password: "they match",
      passwordConfirmation: "they match",
      resetToken: "123456",
    };

    await authController.resetPasswordViaToken(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Token Expired");
  });

  it("should update the user token", async function () {
    const stubedDate = sinon.stub(Date, "now");
    stubedDate.returns(-Infinity); //'isExpired' will be false

    await authController.resetPasswordViaToken(req, res, () => {});
    updatedUserForTests = await User.findById(userForTests._id).select(
      "+password"
    );

    expect(updatedUserForTests.resetToken).equal("");
    expect(updatedUserForTests.tokenExpiration).equal(undefined);

    stubedDate.restore();
  });

  it("should update the user password", async function () {
    const stubedDate = sinon.stub(Date, "now");
    stubedDate.returns(-Infinity); //'isExpired' will be false

    const diiUpdateCorrectly = await bcrypt.compare(
      "they match",
      updatedUserForTests.password
    );

    expect(diiUpdateCorrectly).equal(true);

    stubedDate.restore();
  });

  it("should return a 200 response", async function () {
    expect(res.statusCode).equal(200);
    expect(res.msg).equal(
      `${updatedUserForTests.name}'s password successfully changed!`
    );
  });

  after(async () => {
    await afterTests();
  });
});

describe("verifyToken tests", function () {
  let req, res;
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
  before((done) => {
    connectDb()
      .then((_) => {
        const user = new User({
          name: "tester",
          username: "tester",
          email: "test@test.com",
          password: "123456",
          gender: "male",
          dateOfBirth: "02/01/2000",
          resetToken: "123456",
          tokenExpiration: Date.now() - 3600000, //expired
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

  it("should send error response for invalid token", async function () {
    req = {
      params: { token: "not match" },
    };

    await authController.validateResetToken(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Invalid Token");
  });

  it("should send error response for expired token", async function () {
    req = {
      params: { token: "123456" },
    };

    await authController.validateResetToken(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Token Expired");
  });

  it("should return a 200 response", async function () {
    const stubedDate = sinon.stub(Date, "now");
    stubedDate.returns(-Infinity); //'isExpired' will be false

    await authController.validateResetToken(req, res, () => {});

    expect(res.statusCode).equal(200);
    expect(res.msg).equal("Token Verified Successfully");
    stubedDate.restore();
  });

  after(async () => {
    await afterTests();
  });
});
