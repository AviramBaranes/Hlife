import request from "supertest";
import { expect } from "chai";
import jwt from "jsonwebtoken";

import server from "../app";
import User from "../models/User";
import sinon from "sinon";
import Goals from "../models/Goals";

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

describe("post goals route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).post("/goals");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send an error response for failing validation ", async () => {
    const payload = JSON.stringify({
      basicGoal: "invalid",
      weight: 10,
      fatPercentage: 51,
      musclesMass: 24,
    });

    const response = await request(server)
      .post("/goals")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    expect(response.body.data[0].value).equal("invalid");
    expect(response.body.data[0].msg).equal(
      "basic goal can be either 'lose fat' or 'increase muscles mass'"
    );
    expect(response.body.data[1].value).equal(10);
    expect(response.body.data[1].msg).equal("Weight must be a number");
    expect(response.body.data[2].value).equal(51);
    expect(response.body.data[2].msg).equal("Fat percentage must be a number");
    expect(response.body.data[3].value).equal(24);
    expect(response.body.data[3].msg).equal("Muscles mass must be a number");
  });

  it("should move from validation middleware successfully", async () => {
    const payload = JSON.stringify({
      basicGoal: "lose fat",
      weight: 30,
    });

    const response = await request(server)
      .post("/goals")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      "If you want to lose fat you need to provide your fat percentage"
    );
  });
});

describe("change basic goal route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).put("/goals/basicGoal");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send an error response for failing validation ", async () => {
    const payload = JSON.stringify({
      fatPercentage: 51,
      musclesMass: 24,
    });

    const response = await request(server)
      .put("/goals/basicGoal")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    expect(response.body.data[0].value).equal(51);
    expect(response.body.data[0].msg).equal("Fat percentage must be a number");
    expect(response.body.data[1].value).equal(24);
    expect(response.body.data[1].msg).equal("Muscles mass must be a number");
  });

  it("should move from validation middleware successfully", async () => {
    const stubedGoalsModel = sinon.stub(Goals, "findOne");
    stubedGoalsModel.returns(false);

    const payload = JSON.stringify({
      fatPercentage: 50,
      musclesMass: 25,
    });

    const response = await request(server)
      .put("/goals/basicGoal")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("Goals have not created yet for this user");

    stubedGoalsModel.restore();
  });
});

describe("change goals route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).put("/goals");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send an error response for failing validation ", async () => {
    const payload = JSON.stringify({
      weight: 29,
      fatPercentage: 51,
      musclesMass: 24,
    });

    const response = await request(server)
      .put("/goals")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    expect(response.body.data[0].value).equal(29);
    expect(response.body.data[0].msg).equal("Weight must be a number");
    expect(response.body.data[1].value).equal(51);
    expect(response.body.data[1].msg).equal("Fat percentage must be a number");
    expect(response.body.data[2].value).equal(24);
    expect(response.body.data[2].msg).equal("Muscles mass must be a number");
  });

  it("should move from validation middleware successfully", async () => {
    const stubedGoalsModel = sinon.stub(Goals, "findOne");
    stubedGoalsModel.returns(false);

    const payload = JSON.stringify({
      weight: 30,
      fatPercentage: 50,
      musclesMass: 25,
    });

    const response = await request(server)
      .put("/goals")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("Goals have not created yet for this user");

    stubedGoalsModel.restore();
  });

  it("should move from validation middleware successfully (optional values are omitted)", async () => {
    const stubedGoalsModel = sinon.stub(Goals, "findOne");
    stubedGoalsModel.returns(false);

    const response = await request(server)
      .put("/goals")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("Goals have not created yet for this user");

    stubedGoalsModel.restore();
  });
});

describe("get goals route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).get("/goals");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should move from validation middleware successfully", async () => {
    const stubedGoalsModel = sinon.stub(Goals, "findOne");
    stubedGoalsModel.returns(false);

    const response = await request(server)
      .get("/goals")
      .set("Cookie", [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("Goals have not created yet for this user");

    stubedGoalsModel.restore();
  });
});
