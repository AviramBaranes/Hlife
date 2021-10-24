import { expect } from "chai";

import { validateEnums } from "../utils/helpers/validation/customValidationHelpers";
import {
  ExercisesObj,
  validateExercises,
} from "../utils/program/programHelpers";

describe("validation helpers tests", () => {
  const exercises = [
    { name: "name", sets: 2, reps: 2, muscles: ["Chest", "Abs"] },
  ] as ExercisesObj[];
  it("should throw error if value is not in enum", () => {
    try {
      validateEnums("A", ["a", "b", "c"]);
    } catch (err:any) {
      expect(err).to.be.an("error");
      expect(err.message).equal("Invalid value");
    }
  });
  it("should return true if value is in the enum", () => {
    const result = validateEnums("A", ["A", "b", "c"]);

    expect(result).equal(true);
  });

  it("should throw error if exercises are invalid (sets)", () => {
    exercises.push({
      name: "name",
      sets: 0,
      reps: 2,
    });
    const result = validateExercises(exercises);
    expect(result).equal(false); // if test fails the catch block will not run
  });
  it("should throw error if exercises are invalid (reps)", () => {
    exercises.pop();
    exercises.push({
      name: "name",
      sets: 1,
      reps: 100,
    });
    const result = validateExercises(exercises);
    expect(result).equal(false); // if test fails the catch block will not run
  });
  it("should throw error if exercises are invalid (muscles)", () => {
    exercises.pop();
    exercises.push({
      name: "name",
      sets: 1,
      reps: 8,
      muscles: ["Chest", "not a muscle", "Abs"],
    });
    const result = validateExercises(exercises);
    expect(result).equal(false); // if test fails the catch block will not run
  });
  it("should return true is exercises are valid", () => {
    exercises.pop();
    exercises.push({
      name: "name",
      sets: 1,
      reps: 50,
      muscles: ["Chest", "Abs"],
    });
    const result = validateExercises(exercises);
    expect(result).equal(true); // if test fails the catch block will not run
  });
});
