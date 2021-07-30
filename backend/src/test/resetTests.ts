import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import sinon from "sinon";

//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendGridMail from "@sendgrid/mail";

import * as authController from "../controller/auth";
import User from "../models/User";

import createCustomResponseObj from "../utils/helpers/forTests/responseDefaultObj";

interface UserForTest {
  name: string;
  resetToken: string;
  tokenExpiration: Date;
  password: string;
}

describe("resetPassword in settings tests", () => {
  const req = {
    body: {
      userId: 1,
      currentPassword: null,
      newPassword: "1234567",
      newPasswordConfirmation: "not match",
    },
  };

  const res = createCustomResponseObj();
  let stubedUser: sinon.SinonStub;
  it("should response with 403 if user not found", async function () {
    stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns({
      select: sinon.stub().returns(false),
    });

    await authController.resetPassword(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Unauthorized");
  });

  it("should response with 403 if passwords do not match", async function () {
    stubedUser.returns({
      select: sinon.stub().returns(true),
    });

    await authController.resetPassword(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Passwords do not match");
  });

  it("should fail to compare passwords", async function () {
    req.body.newPasswordConfirmation = "1234567";

    const stubedBcrypt = sinon.stub(bcrypt, "compare") as sinon.SinonStub;
    stubedBcrypt.returns(false);
    stubedUser.returns({
      select: sinon.stub().returns(true),
    });

    await authController.resetPassword(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Password is invalid");

    stubedBcrypt.restore();
  });

  it("should change user password and send correct response", async function () {
    req.body.newPasswordConfirmation = "1234567";

    const stubedBcryptCompare = sinon.stub(
      bcrypt,
      "compare"
    ) as sinon.SinonStub;
    const stubedBcryptHash = sinon.stub(bcrypt, "hash") as sinon.SinonStub;

    stubedBcryptCompare.returns(true);

    stubedUser.returns({
      select: sinon.stub().returns({ password: "", save: sinon.stub() }),
    });

    stubedBcryptHash.returns("new password");

    await authController.resetPassword(req as any, res as any, () => {});

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
  let user: UserForTest;
  let stubedUser: sinon.SinonStub;
  let stubedSendGridSend: sinon.SinonStub;
  const req = {
    body: { email: "fakeEmail@fake.com" },
    headers: { cookie: "not a csrf cookie" },
  };
  const res = createCustomResponseObj();

  it("should send a csrf error if cant find token in cookie", async function () {
    await authController.sendResetEmail(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("CSRF ERROR");
  });

  it("should send a User not found error if user not found", async function () {
    req.headers.cookie = "XSRF-TOKEN=123";

    stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns(false);

    await authController.sendResetEmail(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("User not found, Make sure the email is correct");
  });

  it("should set a reset token", async function () {
    sinon.stub(sendGridMail, "setApiKey");
    stubedSendGridSend = sinon.stub(sendGridMail, "send");

    stubedUser.returns({ name: "aviram", save: sinon.stub() });

    await authController.sendResetEmail(req as any, res as any, () => {});

    user = await User.findOne();

    expect(user.resetToken.length).equal(64);
    expect(user.tokenExpiration).below(Number(new Date(Date.now() + 36000000)));
    stubedUser.restore();
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
  let user: UserForTest;
  let stubedUser: sinon.SinonStub;
  const res = createCustomResponseObj();
  const req = {
    body: {
      password: "they are",
      passwordConfirmation: "not a match",
      resetToken: "token",
    },
  };

  it("should send error response for not matching passwords", async function () {
    await authController.resetPasswordViaToken(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Passwords do not match");
  });

  it("should send error response for wrong token", async function () {
    req.body = {
      password: "they match",
      passwordConfirmation: "they match",
      resetToken: "token",
    };

    stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns(false);

    await authController.resetPasswordViaToken(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Invalid Token");
  });

  it("should send error response for expired token", async function () {
    stubedUser.returns({ tokenExpiration: -Infinity });

    await authController.resetPasswordViaToken(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Token Expired");
  });

  it("should update the user's token", async function () {
    const stubedDate = sinon.stub(Date, "now");
    const stubedBcrypt = sinon.stub(bcrypt, "hash") as sinon.SinonStub;

    stubedDate.returns(-Infinity); //'isExpired' will be false
    stubedUser.returns({ save: sinon.stub(), name: "aviram" });
    stubedBcrypt.returns("123456");

    await authController.resetPasswordViaToken(
      req as any,
      res as any,
      () => {}
    );

    user = User.findOne();

    expect(user.resetToken).equal("");
    expect(user.tokenExpiration).equal(undefined);

    stubedDate.restore();
    stubedUser.restore();
    stubedBcrypt.restore();
  });

  it("should update the user password", async function () {
    expect(user.password).equal("123456");
  });

  it("should return a 200 response", async function () {
    expect(res.statusCode).equal(200);
    expect(res.msg).equal(`${user.name}'s password successfully changed!`);
  });
});

describe("verifyToken tests", function () {
  const req = {
    params: { token: "not match" },
  };
  const res = createCustomResponseObj();
  let stubedUser: sinon.SinonStub;

  it("should send error response for invalid token", async function () {
    stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns(false);

    await authController.validateResetToken(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Invalid Token");
  });

  it("should send error response for expired token", async function () {
    req.params.token = "123456";

    stubedUser.returns({ tokenExpiration: -Infinity });

    await authController.validateResetToken(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("Token Expired");
  });

  it("should return a 200 response", async function () {
    stubedUser.returns(Infinity);

    await authController.validateResetToken(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.msg).equal("Token Verified Successfully");
    stubedUser.restore();
  });
});
//18 tests
