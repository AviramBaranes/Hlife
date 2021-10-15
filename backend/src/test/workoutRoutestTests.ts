import request from "supertest";
import { expect } from "chai";
import jwt from "jsonwebtoken";

import server from "../app";
import User from "../models/User";
import sinon from "sinon";
import Workout from "../models/Workout";

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

describe("post workout route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).post("/workout");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send an error response for failing validation ", async () => {
    const payload = JSON.stringify({
      trainingDayName: "W",
      name: "1-",
      description: "too-short",
      exercises: [
        { muscles: ["Claves"], sets: 2, reps: 2 },
        { muscles: ["invalid"], sets: 10, reps: 51 },
      ],
      time: 1,
    });

    const response = await request(server)
      .post("/workout")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    expect(response.body.data[0].value).equal("W");
    expect(response.body.data[0].msg).equal("Invalid training day name");
    expect(response.body.data[1].value).equal("1-");
    expect(response.body.data[1].msg).equal("Name can contain only letters");
    expect(response.body.data[2].msg).equal("Name must be at least 3 letters");
    expect(response.body.data[3].msg).equal("Exercises are invalid");
    expect(response.body.data[4].value).equal(1);
    expect(response.body.data[4].msg).equal("Time is invalid");
  });

  it("should move from validation middleware successfully", async () => {
    const stubedUserModel = sinon.stub(User, "findById");
    stubedUserModel.returns({
      populate() {
        return { workouts: [{ name: "name" }] };
      },
    });

    const payload = JSON.stringify({
      trainingDayName: "A",
      name: "name",
      description: "this is a description",
      exercises: [
        { muscles: ["Claves"], sets: 2, reps: 2 },
        { muscles: ["Abs"], sets: 1, reps: 5 },
      ],
      time: 20,
    });

    const response = await request(server)
      .post("/workout")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("Each workout need to have a unique name");

    stubedUserModel.restore();
  });
});

describe("get workout by name route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).get("/workout/?trainingDay=W");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send an error response for failing validation ", async () => {
    const response = await request(server)
      .get("/workout/?trainingDayName=W")
      .set("Cookie", [`jon=${token}`]);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    expect(response.body.data[0].value).equal("W");
    expect(response.body.data[0].msg).equal("Invalid training day name");
  });

  it("should move from validation middleware successfully", async () => {
    const stubedWorkoutModel = sinon.stub(Workout, "findOne");
    stubedWorkoutModel.returns(false);

    const response = await request(server)
      .get("/workout/?trainingDayName=A")
      .set("Cookie", [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      "couldn't find workout, make sure you create a workout with this name first."
    );

    stubedWorkoutModel.restore();
  });
});

describe("get workout by id route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).get("/workout/id");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should move from validation middleware successfully", async () => {
    const stubedWorkoutModel = sinon.stub(Workout, "findById");
    stubedWorkoutModel.returns(false);

    const response = await request(server)
      .get("/workout/id")
      .set("Cookie", [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("No workout with this id");

    stubedWorkoutModel.restore();
  });
});

describe("change workout route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).put("/workout");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send an error response for failing validation ", async () => {
    const payload = JSON.stringify({
      trainingDayName: "W",
      name: "1-",
      description: "too-short",
      exercises: [
        { muscles: ["Claves"], sets: 2, reps: 2 },
        { muscles: ["invalid"], sets: 10, reps: 51 },
      ],
      time: 1,
    });

    const response = await request(server)
      .put("/workout")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    expect(response.body.data[0].value).equal("W");
    expect(response.body.data[0].msg).equal("Invalid training day name");
    expect(response.body.data[1].value).equal("1-");
    expect(response.body.data[1].msg).equal("Name can contain only letters");
    expect(response.body.data[2].msg).equal("Name must be at least 3 letters");
    expect(response.body.data[3].value).equal("too-short");
    expect(response.body.data[3].msg).equal("Description too short");
    expect(response.body.data[4].msg).equal("Exercises are invalid");
    expect(response.body.data[5].value).equal(1);
    expect(response.body.data[5].msg).equal("Time is invalid");
  });

  it("should move from validation middleware successfully", async () => {
    const stubedWorkoutModel = sinon.stub(Workout, "findOne");
    stubedWorkoutModel.returns(false);

    const payload = JSON.stringify({
      trainingDayName: "A",
      name: "name",
      description: "this is a description",
      exercises: [
        { muscles: ["Claves"], sets: 2, reps: 2 },
        { muscles: ["Abs"], sets: 1, reps: 5 },
      ],
      time: 20,
    });

    const response = await request(server)
      .put("/workout")
      .set("Cookie", [`jon=${token}`])
      .set("Content-type", "application/json")
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      "couldn't find workout, make sure you create a workout with this name first."
    );

    stubedWorkoutModel.restore();
  });
});

describe("delete workout route", () => {
  it("should send an error response if unauthorized", async () => {
    const response = await request(server).delete("/workout/trainingDayName");

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal("Unauthorized cookie is invalid");
  });

  it("should send an error response for failing validation ", async () => {
    const response = await request(server)
      .delete("/workout/W")
      .set("Cookie", [`jon=${token}`])
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal("Validation Failed");
    expect(response.body.data[0].value).equal("W");
    expect(response.body.data[0].msg).equal("Invalid training day name");
  });

  it("should move from validation middleware successfully", async () => {
    const stubedWorkoutModel = sinon.stub(Workout, "findOneAndDelete");
    stubedWorkoutModel.returns(false);

    const response = await request(server)
      .delete("/workout/A")
      .set("Cookie", [`jon=${token}`])
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      "couldn't find workout, make sure you create a workout with this name first."
    );

    stubedWorkoutModel.restore();
  });
});
