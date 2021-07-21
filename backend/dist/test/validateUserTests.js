"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const authController = __importStar(require("../controller/auth"));
const User_1 = __importDefault(require("../models/User"));
const responseDefaultObj_1 = __importDefault(require("../utils/forTests/responseDefaultObj"));
describe("validateUser tests", () => {
    const req = { userId: 1 };
    const res = responseDefaultObj_1.default();
    let stubedUser;
    before(async () => {
        stubedUser = sinon_1.default.stub(User_1.default, "findById");
        stubedUser.returns({
            username: "aviram",
            hasProgram: true,
            hasDiet: false,
        });
        await authController.validateUser(req, res, () => { });
    });
    it("should set the right status code in res", () => {
        chai_1.expect(res.statusCode).equal(200);
    });
    it("should set the right json data in res", () => {
        chai_1.expect(res.jsonObj.isAuthenticated).equal(true);
        chai_1.expect(res.jsonObj.username).equal("aviram");
        chai_1.expect(res.jsonObj.hasProgram).equal(true);
        chai_1.expect(res.jsonObj.hasDiet).equal(false);
        chai_1.expect(res.jsonObj.userId).equal(1);
    });
    after(() => {
        stubedUser.restore();
    });
});
//2 tests
