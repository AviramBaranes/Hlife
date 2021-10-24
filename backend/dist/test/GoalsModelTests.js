"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Goals_1 = __importDefault(require("../models/Goals"));
const User_1 = __importDefault(require("../models/User"));
describe("Goals model tests", () => {
    it("should be invalid if required fields are empty", () => {
        const goals = new Goals_1.default();
        goals.validate((err) => {
            (0, chai_1.expect)(err.errors.user.properties.message).equal("Path `user` is required.");
            (0, chai_1.expect)(err.errors.basicGoal.properties.message).equal("Path `basicGoal` is required.");
            (0, chai_1.expect)(err.errors["detailGoals.weight"].properties.message).equal("Path `detailGoals.weight` is required.");
        });
    });
    it("should be invalid if fields are not correct", () => {
        const goalsFields = {
            user: "-",
            basicGoal: "-",
        };
        const goals = new Goals_1.default(goalsFields);
        goals.validate((err) => {
            (0, chai_1.expect)(err.errors.basicGoal.properties.message).equal("`-` is not a valid enum value for path `basicGoal`.");
            (0, chai_1.expect)(err.errors.user.reason.message).equal("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        });
    });
    it("should be a valid model", () => {
        const userFields = {
            name: "-",
            username: "-",
            email: "-",
            password: "-",
            gender: "male",
            dateOfBirth: "01/01/2005",
        };
        const user = new User_1.default(userFields);
        const goalsFields = {
            user: user._id,
            basicGoal: "lose fat",
            detailGoals: { weight: 70 },
        };
        const goals = new Goals_1.default(goalsFields);
        goals.validate((err) => {
            (0, chai_1.expect)(err).equal(null);
        });
    });
});
