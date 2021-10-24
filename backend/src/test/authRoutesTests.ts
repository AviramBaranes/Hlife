import request from "supertest";
import { expect } from "chai";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import server from "../app";
import User from "../models/User";
import sinon from "sinon";

const user = new User({
  name: "-",
  username: "-",
  email: "-",
  password: "-",
  gender: "male",
  dateOfBirth: "01/01/2005",
});

const payload = { userId: user._id.toString() };
const token = jwt.sign(payload, process.env.jwtSecret as string, {
  expiresIn: "2d",
});

describe("signup route test", () => {
  it("should send a validation error response for invalid values", async () => {
    const payload = JSON.stringify({
      name: "3",
      username: "4-",
      email: "not-an-email",
      password: "123456ab",
      passwordConfirmation: "123-",
      gender: "not-valid",
      dateOfBirth: "01-01-2006",
    });

    const response = await request(server)
      .post("/auth/signup")
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.body.message).equal("Validation Failed");
    expect(response.statusCode).equal(422);
    expect(response.body.data[0].msg).equal("name only allow letters");
    expect(response.body.data[0].value).equal("3");
    expect(response.body.data[1].msg).equal(
      "name must be at least 3 characters"
    );
    
    expect(response.body.data[2].msg).equal("please enter a correct email");
    expect(response.body.data[2].value).equal("not-an-email");
    expect(response.body.data[3].msg).equal(
      "password need to be at least 6 characters"
    );
    expect(response.body.data[3].value).equal("123-");
    expect(response.body.data[4].msg).equal(
      "password only allow letters and numbers"
    );
    expect(response.body.data[5].msg).equal("gender is invalid");
    expect(response.body.data[5].value).equal("not-valid");
    expect(response.body.data[6].msg).equal(
      'The field must be a date between "01/01/1920" and "01/01/2005"'
    );
    expect(response.body.data[6].value).equal("01-01-2006");
  });

  it("should finish validation middleware successfully", async () => {
    const stubedUser = sinon.stub(User, "findOne");
    stubedUser.returns(true);

    const payload = JSON.stringify({
      name: "aviram",
      username: "aviram11",
      email: "email@email.com",
      password: "1234ab",
      passwordConfirmation: "1234ab",
      gender: "male",
      dateOfBirth: "2001-11-11",
    });

    const response = await request(server)
      .post("/auth/signup")
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("user already exist with this email!");

    stubedUser.restore();
  });
});

describe("login route test", () => {
  it("should send a validation error response for invalid values", async () => {
    const payload = JSON.stringify({
      email: "not-an-email",
      password: "123",
    });

    const response = await request(server)
      .post("/auth/login")
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.body.message).equal("Validation Failed");
    expect(response.statusCode).equal(422);
    expect(response.body.data[0].msg).equal("please enter a correct email");
    expect(response.body.data[0].value).equal("not-an-email");
    expect(response.body.data[1].msg).equal(
      "Invalid password, At least 6 characters for a password"
    );
    expect(response.body.data[1].value).equal("123");
  });

  it("should finish validation middleware successfully", async () => {
    const stubedUser = sinon.stub(User, "findOne");
    stubedUser.returns({
      select() {
        return false;
      },
    });

    const payload = JSON.stringify({
      email: "email@email.com",
      password: "1234ab",
    });

    const response = await request(server)
      .post("/auth/login")
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      "User not found, Make sure the email is correct"
    );

    stubedUser.restore();
  });
});

describe("logout route", () => {
  it("should send an error response for unauthorized user", async () => {
    const response = await request(server).post("/auth/logout");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send a success response", async () => {
    const response = await request(server)
      .post("/auth/logout")
      .set("Cookie", [`jon=${token}`]);

    expect(response.statusCode).equal(201);
    expect(response.text).equal("success");
  });
});

describe("reset password via settings route", () => {
  it("should send an error response for unauthorized user", async () => {
    const response = await request(server).post(
      "/auth/settings/password-reset"
    );

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send an error response if validation failed", async () => {
    const payload = JSON.stringify({
      currentPassword: "123-",
      newPassword: "123-",
      newPasswordConfirmation: "123-",
    });

    const response = await request(server)
      .post("/auth/settings/password-reset")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    //currentPassword
    expect(response.body.data[0].value).equal("123-");
    expect(response.body.data[0].msg).equal(
      "password need to be at least 6 characters"
    );
    expect(response.body.data[3].msg).equal(
      "password only allow letters and numbers"
    );
    //new password
    expect(response.body.data[1].value).equal("123-");
    expect(response.body.data[1].msg).equal(
      "password need to be at least 6 characters"
    );
    expect(response.body.data[4].msg).equal(
      "password only allow letters and numbers"
    );
    //new password confirmation
    expect(response.body.data[2].value).equal("123-");
    expect(response.body.data[2].msg).equal(
      "password need to be at least 6 characters"
    );
    expect(response.body.data[5].msg).equal(
      "password only allow letters and numbers"
    );
  });

  it("should move from the validation middleware successfully", async () => {
    const stubedUser = sinon.stub(User, "findById");
    stubedUser.returns({
      select() {
        return false;
      },
    });

    const payload = JSON.stringify({
      currentPassword: "123abc",
      newPassword: "123abc",
      newPasswordConfirmation: "123abc",
    });

    const response = await request(server)
      .post("/auth/settings/password-reset")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(401);
    expect(response.text).equal("Unauthorized");

    stubedUser.restore();
  });
});

describe("send email route test", () => {
  it("should send a validation error response for invalid values", async () => {
    const payload = JSON.stringify({
      email: "not-an-email",
    });

    const response = await request(server)
      .post("/auth/password/send-token")
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.body.message).equal("Validation Failed");
    expect(response.statusCode).equal(422);
    expect(response.body.data[0].msg).equal("Invalid Email");
    expect(response.body.data[0].value).equal("not-an-email");
  });

  it("should finish validation middleware successfully", async () => {
    const payload = JSON.stringify({
      email: "email@email.com",
      password: "1234ab",
    });

    const response = await request(server)
      .post("/auth/password/send-token")
      .set("Content-type", "application/json")
      .set("Cookie", ["no csrf"])
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("CSRF ERROR");
  });
});

describe("reset via email route test", () => {
  it("should send a validation error response for invalid values", async () => {
    const payload = JSON.stringify({
      password: "123-",
      passwordConfirmation: "123-",
    });

    const response = await request(server)
      .put("/auth/reset/password-reset")
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.body.message).equal("Validation Failed");
    expect(response.statusCode).equal(422);
    //password
    expect(response.body.data[0].msg).equal(
      "password need to be at least 6 characters"
    );
    expect(response.body.data[0].value).equal("123-");
    expect(response.body.data[2].msg).equal(
      "password only allow letters and numbers"
    );
    //passwordConfirmation
    expect(response.body.data[1].value).equal("123-");
    expect(response.body.data[1].msg).equal(
      "password need to be at least 6 characters"
    );
    expect(response.body.data[3].msg).equal(
      "password only allow letters and numbers"
    );
  });

  it("should finish validation middleware successfully", async () => {
    const payload = JSON.stringify({
      password: "1234ab",
      passwordConfirmation: "1234ac",
    });

    const response = await request(server)
      .put("/auth/reset/password-reset")
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("Passwords do not match");
  });
});

describe("validate reset token route", () => {
  it("should send a validation error response for invalid values", async () => {
    const response = await request(server).get(
      "/auth/reset/validate-token/not-long-enough"
    );

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    expect(response.body.data[0].msg).equal("Invalid Token, too short");
    expect(response.body.data[0].value).equal("not-long-enough");
  });

  it("should finish validation middleware successfully", async () => {
    const stubedUser = sinon.stub(User, "findOne");
    stubedUser.returns(false);

    const token = crypto.randomBytes(32).toString("hex");

    const response = await request(server).get(
      `/auth/reset/validate-token/${token}`
    );

    expect(response.statusCode).equal(403);
    expect(response.text).equal("Invalid Token");

    stubedUser.restore();
  });
});

describe("validateUser route", () => {
  it("should send an error response for unauthorized user", async () => {
    const response = await request(server).get("/auth/isUser");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send a success response", async () => {
    const stubedUser = sinon.stub(User, "findById");
    stubedUser.returns({ username: "-", hasProgram: "-" });

    const response = await request(server)
      .get("/auth/isUser")
      .set("Cookie", [`jon=${token}`]);

    expect(response.statusCode).equal(200);

    stubedUser.restore();
  });
});
