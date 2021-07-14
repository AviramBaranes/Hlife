require("dotenv").config({ path: "./config.env" });

const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");
const sendGridMail = require("@sendgrid/mail");

const authController = require("../controller/auth");

const User = require("../models/User");

const fakeResponseObj = require("../utils/forTests/responseDefaultObj");

describe("resetPassword in settings tests", function () {
  let req, res;
  it("should response with 403 if user not found", async function () {
    req = {
      body: {
        userId: 1,
        currentPassword: null,
        newPassword: "1234567",
        newPasswordConfirmation: "not match",
      },
    };

    res = fakeResponseObj();

    const stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns({
      select: sinon.stub().returns(false),
    });

    await authController.resetPassword(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Unauthorized");

    stubedUser.restore();
  });

  it("should response with 403 if passwords do not match", async function () {
    const stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns({
      select: sinon.stub().returns(true),
    });

    await authController.resetPassword(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Passwords do not match");

    stubedUser.restore();
  });

  it("should fail to compare passwords", async function () {
    req.body.newPasswordConfirmation = "1234567";

    const stubedUser = sinon.stub(User, "findOne");
    const stubedBcrypt = sinon.stub(bcrypt, "compare");
    stubedBcrypt.returns(false);
    stubedUser.returns({
      select: sinon.stub().returns(true),
    });

    await authController.resetPassword(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Password is invalid");

    stubedUser.restore();
    stubedBcrypt.restore();
  });

  it("should change user password and send correct response", async function () {
    req.body.newPasswordConfirmation = "1234567";

    const stubedUser = sinon.stub(User, "findOne");
    const stubedBcryptCompare = sinon.stub(bcrypt, "compare");
    const stubedBcryptHash = sinon.stub(bcrypt, "hash");

    stubedBcryptCompare.returns(true);

    stubedUser.returns({
      select: sinon.stub().returns({ password: "", save: sinon.stub() }),
    });

    stubedBcryptHash.returns("new password");

    await authController.resetPassword(req, res, () => {});

    const user = User.findOne().select();

    expect(user.password).equal("new password");
    expect(res.statusCode).equal(200);
    expect(res.msg).equal("password reseted successfully!");

    stubedUser.restore();
    stubedBcryptCompare.restore();
    stubedBcryptHash.restore();
  });
});

describe("sendResetEmail tests", function () {
  let user;
  let req, res;
  let stubedSendGridSend;
  req = {
    body: { email: "fakeEmail@fake.com" },
    headers: { cookie: "not a csrf cookie" },
  };

  res = fakeResponseObj();
  it("should send a csrf error if cant find token in cookie", async function () {
    await authController.sendResetEmail(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("CSRF ERROR");
  });

  it("should send a User not found error if user not found", async function () {
    req.headers.cookie = "XSRF-TOKEN=123";

    const stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns(false);

    await authController.sendResetEmail(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("User not found, Make sure the email is correct");

    stubedUser.restore();
  });

  it("should set a reset token", async function () {
    sinon.stub(sendGridMail, "setApiKey");
    stubedSendGridSend = sinon.stub(sendGridMail, "send");
    const stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns({ name: "aviram", save: sinon.stub() });

    await authController.sendResetEmail(req, res, () => {});

    user = await User.findOne();

    stubedUser.restore();
    expect(user.resetToken.length).equal(64);
    expect(user.tokenExpiration).below(Number(new Date(Date.now() + 36000000)));
  });

  it("should call sendgrid.send with the right message", async () => {
    const link = `http://localhost:3000/auth/reset-password/${user.resetToken}`;
    const html = `<p>Hey ${user.name.toString()}, Please visit this <a href=${link}>link</a> in order to reset your Hlife account Password.</p><p>This token is valid for only 1 hour.</p>`;

    expect(stubedSendGridSend.lastCall.firstArg.to).equal("fakeEmail@fake.com");
    expect(stubedSendGridSend.lastCall.firstArg.subject).equal(
      "Hlife reset password"
    );
    expect(stubedSendGridSend.lastCall.firstArg.html).equal(html);
  });

  it("should response 200", async function () {
    expect(res.statusCode).equal(200);
    expect(res.msg).equal("Reset Email Sent!");
  });
});

describe("resetPasswordViaToken tests", function () {
  let req;
  const res = fakeResponseObj();

  it("should send error response for not matching passwords", async function () {
    req = {
      body: {
        password: "they are",
        passwordConfirmation: "not a match",
        resetToken: "token",
      },
    };

    await authController.resetPasswordViaToken(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Passwords do not match");
  });

  it("should send error response for wrong token", async function () {
    req.body = {
      password: "they match",
      passwordConfirmation: "they match",
      resetToken: "token",
    };

    const stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns(false);

    await authController.resetPasswordViaToken(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Invalid Token");

    stubedUser.restore();
  });

  it("should send error response for expired token", async function () {
    const stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns({ tokenExpiration: -Infinity });

    await authController.resetPasswordViaToken(req, res, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Token Expired");
  });

  // it("should update the user token", async function () {
  //   const stubedDate = sinon.stub(Date, "now");
  //   stubedDate.returns(-Infinity); //'isExpired' will be false

  //   await authController.resetPasswordViaToken(req, res, () => {});
  //   updatedUserForTests = await User.findById(userForTests._id).select(
  //     "+password"
  //   );

  //   expect(updatedUserForTests.resetToken).equal("");
  //   expect(updatedUserForTests.tokenExpiration).equal(undefined);

  //   stubedDate.restore();
  // });

  //   it("should update the user password", async function () {
  //     const stubedDate = sinon.stub(Date, "now");
  //     stubedDate.returns(-Infinity); //'isExpired' will be false

  //     const diiUpdateCorrectly = await bcrypt.compare(
  //       "they match",
  //       updatedUserForTests.password
  //     );

  //     expect(diiUpdateCorrectly).equal(true);

  //     stubedDate.restore();
  //   });

  //   it("should return a 200 response", async function () {
  //     expect(res.statusCode).equal(200);
  //     expect(res.msg).equal(
  //       `${updatedUserForTests.name}'s password successfully changed!`
  //     );
  //   });

  //   after(async () => {
  //     await afterTests();
  //   });
});

// describe("verifyToken tests", function () {
//   let req, res;
//   res = {
//     statusCode: null,
//     msg: null,
//     status(code) {
//       this.statusCode = code;
//       return this;
//     },
//     send(msg) {
//       this.msg = msg;
//     },
//   };
//   before((done) => {
//     connectDb()
//       .then((_) => {
//         const user = new User({
//           name: "tester",
//           username: "tester",
//           email: "test@test.com",
//           password: "123456",
//           gender: "male",
//           dateOfBirth: "02/01/2000",
//           resetToken: "123456",
//           tokenExpiration: Date.now() - 3600000, //expired
//         });
//         user
//           .save()
//           .then((savedUser) => {
//             userForTests = savedUser;
//             done();
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   it("should send error response for invalid token", async function () {
//     req = {
//       params: { token: "not match" },
//     };

//     await authController.validateResetToken(req, res, () => {});

//     expect(res.statusCode).equal(403);
//     expect(res.msg).equal("Invalid Token");
//   });

//   it("should send error response for expired token", async function () {
//     req = {
//       params: { token: "123456" },
//     };

//     await authController.validateResetToken(req, res, () => {});

//     expect(res.statusCode).equal(403);
//     expect(res.msg).equal("Token Expired");
//   });

//   it("should return a 200 response", async function () {
//     const stubedDate = sinon.stub(Date, "now");
//     stubedDate.returns(-Infinity); //'isExpired' will be false

//     await authController.validateResetToken(req, res, () => {});

//     expect(res.statusCode).equal(200);
//     expect(res.msg).equal("Token Verified Successfully");
//     stubedDate.restore();
//   });

//   after(async () => {
//     await afterTests();
//   });
// });
