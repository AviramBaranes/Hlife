"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Program_1 = __importDefault(require("../models/Program"));
const User_1 = __importDefault(require("../models/User"));
describe("Program model tests", () => {
    it("should be invalid if required fields are empty", () => {
        const program = new Program_1.default({});
        program.validate((err) => {
            (0, chai_1.expect)(err.errors.user.properties.message).equal("Path `user` is required.");
        });
    });
    it("should be invalid if fields are not correct", () => {
        const programFields = {
            user: "-",
            program: [{ day: "-", workout: "-" }],
        };
        const program = new Program_1.default(programFields);
        program.validate((err) => {
            (0, chai_1.expect)(err.errors.user.reason.message).equal("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
            (0, chai_1.expect)(err.errors["program.0.day"].properties.message).equal("`-` is not a valid enum value for path `day`.");
            (0, chai_1.expect)(err.errors["program.0.workout"].reason.message).equal("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        });
    });
    it("should be a valid model with defaults", () => {
        const userFields = {
            name: "-",
            username: "-",
            email: "-",
            password: "-",
            gender: "male",
            dateOfBirth: "01/01/2005",
        };
        const user = new User_1.default(userFields);
        const programFields = {
            user: user._id,
            program: [{ day: "Sunday" }],
        };
        const stats = new Program_1.default(programFields);
        stats.validate((err) => {
            (0, chai_1.expect)(err).equal(null);
        });
    });
});
