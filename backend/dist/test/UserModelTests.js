"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const User_1 = __importDefault(require("../models/User"));
describe("User model tests", () => {
    it("should be invalid if required fields are empty", () => {
        const user = new User_1.default({});
        user.validate((err) => {
            chai_1.expect(err.errors.name.properties.message).equal("Path `name` is required.");
            chai_1.expect(err.errors.username.properties.message).equal("Path `username` is required.");
            chai_1.expect(err.errors.email.properties.message).equal("Path `email` is required.");
            chai_1.expect(err.errors.password.properties.message).equal("Path `password` is required.");
            chai_1.expect(err.errors.dateOfBirth.properties.message).equal("Path `dateOfBirth` is required.");
        });
    });
    it("should be invalid if fields are not correct", () => {
        const userFields = {
            gender: "-",
            dateOfBirth: "01/01/2007",
        };
        const user = new User_1.default(userFields);
        user.validate((err) => {
            chai_1.expect(err.errors.gender.properties.message).equal("`-` is not a valid enum value for path `gender`.");
            chai_1.expect(!!err.errors.dateOfBirth.properties.message).equal(true);
        });
    });
    it("should be a valid model with default properties", () => {
        const userFields = {
            name: "-",
            username: "-",
            email: "-",
            password: "-",
            gender: "male",
            dateOfBirth: "01/01/2005",
        };
        const user = new User_1.default(userFields);
        user.validate((err) => {
            chai_1.expect(err).equal(null);
        });
        chai_1.expect(user.hasProgram).equal(false);
        chai_1.expect(user.hasGoals).equal(false);
        chai_1.expect(user.hasInitialStats).equal(false);
    });
});
