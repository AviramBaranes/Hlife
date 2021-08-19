import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import sinon, { SinonStub, stub } from "sinon";

import * as programExecutionController from "../controller/programExecution";
import createCustomResponseObj, {
  ResponseCustomObject,
} from "../utils/helpers/forTests/responseDefaultObj";

import Workout from "../models/Workout";
import User from "../models/User";
import Program from "../models/Program";

describe("getExercisesByDate endpoint test", () => {
  const res = createCustomResponseObj();
  const req = {
    userId: "61196b0a38af7615d0aed56e",
    params: {} as any,
  };
  let stubedWorkoutModel: SinonStub;
  let stubedProgramModel: SinonStub;
  let stubedUserModel: SinonStub;

  beforeEach(() => {
    stubedWorkoutModel = sinon.stub(Workout, "findById");
    stubedProgramModel = sinon.stub(Program, "findOne");
    stubedUserModel = sinon.stub(User, "findById");
  });

  it("should send an error response if user does not have a full program", async () => {
    stubedUserModel.returns({ hasProgram: false });

    await programExecutionController.getExercisesByDate(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(401);
    expect(res.msg).equal(
      "You need to create a full program before you declare about execution"
    );
  });
  it("should send a success response if this day is rest day (no date in params)", async () => {
    // I needed to make sure that program returns an array of objects,
    // and that one of the object is with a day that equal to today (whenever the test runs) and one that is not today
    const day = new Date();
    const nextDay = new Date();
    nextDay.setDate(day.getDate() + 1);

    const today = new Intl.DateTimeFormat("en-Us", { weekday: "long" }).format(
      day
    );
    const tomorrow = new Intl.DateTimeFormat("en-Us", {
      weekday: "long",
    }).format(nextDay);

    stubedUserModel.returns({ hasProgram: true });
    stubedProgramModel.returns({
      program: [
        { day: today, restDay: true },
        { day: tomorrow, restDay: false },
      ],
    });

    await programExecutionController.getExercisesByDate(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(200);
    expect(res.msg).equal(
      "This is a rest day, You have no exercises to complete!"
    );
  });

  it("should send a success response if this day is rest day (date in params)", async () => {
    req.params.date = new Date("2021-08-15"); //A random sunday

    stubedUserModel.returns({ hasProgram: true });
    stubedProgramModel.returns({
      program: [
        { day: "Sunday", restDay: true },
        { day: "Monday", restDay: false },
      ],
    });

    await programExecutionController.getExercisesByDate(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(200);
    expect(res.msg).equal(
      "This is a rest day, You have no exercises to complete!"
    );
  });

  it("should send a success response with the exercises", async () => {
    stubedUserModel.returns({ hasProgram: true });
    stubedProgramModel.returns({
      program: [
        { day: "Sunday", restDay: false },
        { day: "Monday", restDay: false },
      ],
    });
    stubedWorkoutModel.returns({
      exercises: [
        { name: "name1", data: "data1" },
        { name: "name2", data: "data2" },
      ],
    });

    await programExecutionController.getExercisesByDate(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(200);
    expect(res.jsonObj.exercises).eql(["name1", "name2"]);
  });

  afterEach(() => {
    stubedProgramModel.restore();
    stubedUserModel.restore();
    stubedWorkoutModel.restore();
  });
});
