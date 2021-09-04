"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const customValidationHelpers_1 = require("../utils/helpers/validation/customValidationHelpers");
const programHelpers_1 = require("../utils/program/programHelpers");
describe("validation helpers tests", () => {
    const exercises = [
        { name: "name", sets: 2, reps: 2, muscles: ["Chest", "Abs"] },
    ];
    it("should throw error if value is not in enum", () => {
        try {
            customValidationHelpers_1.validateEnums("A", ["a", "b", "c"]);
        }
        catch (err) {
            chai_1.expect(err).to.be.an("error");
            chai_1.expect(err.message).equal("Invalid value");
        }
    });
    it("should return true if value is in the enum", () => {
        const result = customValidationHelpers_1.validateEnums("A", ["A", "b", "c"]);
        chai_1.expect(result).equal(true);
    });
    it("should throw error if exercises are invalid (sets)", () => {
        exercises.push({
            name: "name",
            sets: 0,
            reps: 2,
        });
        const result = programHelpers_1.validateExercises(exercises);
        chai_1.expect(result).equal(false); // if test fails the catch block will not run
    });
    it("should throw error if exercises are invalid (reps)", () => {
        exercises.pop();
        exercises.push({
            name: "name",
            sets: 1,
            reps: 100,
        });
        const result = programHelpers_1.validateExercises(exercises);
        chai_1.expect(result).equal(false); // if test fails the catch block will not run
    });
    it("should throw error if exercises are invalid (muscles)", () => {
        exercises.pop();
        exercises.push({
            name: "name",
            sets: 1,
            reps: 8,
            muscles: ["Chest", "not a muscle", "Abs"],
        });
        const result = programHelpers_1.validateExercises(exercises);
        chai_1.expect(result).equal(false); // if test fails the catch block will not run
    });
    it("should return true is exercises are valid", () => {
        exercises.pop();
        exercises.push({
            name: "name",
            sets: 1,
            reps: 50,
            muscles: ["Chest", "Abs"],
        });
        const result = programHelpers_1.validateExercises(exercises);
        chai_1.expect(result).equal(true); // if test fails the catch block will not run
    });
});
