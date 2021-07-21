"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const chai_1 = require("chai");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
describe("auth middleware tests", function () {
    it("should throw error if no `jon` cookie", function () {
        const req = {
            headers: {
                cookie: "",
            },
        };
        const error = authMiddleware_1.default(req, {}, () => { });
        chai_1.expect(error.statusCode).equal(401);
        chai_1.expect(error.message).equal("Unauthorized Couldnt find cookie");
    });
    it("should throw error if cookie is invalid", function () {
        const req = {
            headers: {
                cookie: "jon=fake", //it splits at 'joh='
            },
        };
        const error = authMiddleware_1.default(req, {}, () => { });
        chai_1.expect(error.statusCode).equal(401);
        chai_1.expect(error.message).equal("Unauthorized cookie is invalid");
    });
    it("should add a userId field to request", function () {
        const payload = { userId: "123" };
        const testToken = jsonwebtoken_1.default.sign(payload, process.env.jwtSecret);
        const req = {
            userId: "",
            headers: {
                cookie: `jon=${testToken}`,
            },
        };
        authMiddleware_1.default(req, {}, () => { });
        chai_1.expect(req.userId).equal("123");
    });
});
//3 tests
