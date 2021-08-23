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
//test tools
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
//packages
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//controller to test
const authController = __importStar(require("../controller/auth"));
//models and connections
const User_1 = __importDefault(require("../models/User"));
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
// import Diet from "../models/Diet";
// import DietExecution from "../models/DietExecution";
const Program_1 = __importDefault(require("../models/Program"));
const ProgramExecution_1 = __importDefault(require("../models/ProgramExecution"));
const responseDefaultObj_1 = __importDefault(require("../utils/helpers/forTests/responseDefaultObj"));
let stubedPhysicalStats, stubedDietExecution, stubedProgramExecution, stubedProgram, stubedBcrypt;
// stubedDietModel: SinonStub;
describe("signup Controller error handling", () => {
    let stubedUser;
    const req = {
        body: {
            name: "Avirambr",
            username: "aviramSport2",
            email: "test@test.com",
            password: "testpass123",
            passwordConfirmation: "testpass12",
            gender: "male",
            dateOfBirth: "02/01/2000",
        },
    };
    const res = responseDefaultObj_1.default();
    it("should throw an error if user exist", async function () {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUser.returns(true);
        await authController.signup(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("user already exist with this email!");
    });
    it("should throw an error if password do not match", async function () {
        stubedUser.returns(false);
        await authController.signup(req, res, () => { });
        chai_1.expect(res.statusCode).equal(401);
        chai_1.expect(res.msg).equal("passwords do not match");
    });
    it("should throw a default error", async function () {
        const error = (await authController.signup({}, {}, () => { }));
        chai_1.expect(error.statusCode).equal(500);
        stubedUser.restore();
    });
});
describe("signup Controller creating the correct models", () => {
    let stubedUser, stubedUserPrototype;
    let createdUserArgs, createdPhysicalStatsArgs, 
    // createdDietArgs: CreatedModelsArgs,
    createdProgramArgs, createdProgramExecutionArgs;
    // createdDietExecutionArgs: CreatedModelsArgs;
    before(async () => {
        const res = responseDefaultObj_1.default();
        const req = {
            body: {
                name: "Avirambr",
                username: "aviramSport2",
                email: "test2@test.com",
                password: "testpass123",
                passwordConfirmation: "testpass123",
                gender: "male",
                dateOfBirth: "02/01/2000",
            },
        };
        stubedPhysicalStats = sinon_1.default.stub(PhysicalStats_1.default.prototype, "save");
        // stubedDietExecution = sinon.stub(DietExecution.prototype, "save");
        stubedProgramExecution = sinon_1.default.stub(ProgramExecution_1.default.prototype, "save");
        stubedProgram = sinon_1.default.stub(Program_1.default.prototype, "save");
        stubedBcrypt = sinon_1.default.stub(bcryptjs_1.default, "hash");
        // stubedDietModel = sinon.stub(Diet.prototype, "save");
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUserPrototype = sinon_1.default.stub(User_1.default.prototype, "save");
        stubedBcrypt.returns("123456");
        stubedUser.returns(false);
        stubedUserPrototype.returns({ _id: 1 });
        // stubedDietModel.returns({ _id: 1 });
        await authController.signup(req, res, () => { });
        createdUserArgs = stubedUserPrototype.firstCall.thisValue;
        createdPhysicalStatsArgs = stubedPhysicalStats.firstCall.thisValue;
        // createdDietArgs = stubedDietModel.firstCall.thisValue;
        createdProgramArgs = stubedProgram.firstCall.thisValue;
        createdProgramExecutionArgs = stubedProgramExecution.firstCall.thisValue;
        // createdDietExecutionArgs = stubedDietExecution.firstCall.thisValue;
    });
    it("should create a user model with the right arguments", async () => {
        chai_1.expect(createdUserArgs._id).to.be.an("object");
        chai_1.expect(createdUserArgs.name).equal("Avirambr");
        chai_1.expect(createdUserArgs.username).equal("aviramSport2");
        chai_1.expect(createdUserArgs.email).equal("test2@test.com");
        chai_1.expect(createdUserArgs.gender).equal("male");
        chai_1.expect(createdUserArgs.grade).equal(0);
        chai_1.expect(createdUserArgs.dateOfBirth).eql(new Date("02/01/2000"));
    });
    it("should create a PhysicalStats model", async () => {
        chai_1.expect(createdPhysicalStatsArgs._id).to.be.an("object");
        chai_1.expect(createdPhysicalStatsArgs.user).eql(createdUserArgs._id);
        chai_1.expect(createdPhysicalStatsArgs.age).equal(2021 - 2000);
        chai_1.expect(createdPhysicalStatsArgs.stats).eql([]);
    });
    // it("should create a Diet model", async () => {
    //   expect(createdDietArgs._id).to.be.an("object");
    //   expect(createdDietArgs.user).eql(createdUserArgs._id);
    //   expect(createdDietArgs.ingredients).eql([]);
    // });
    it("should create a Program model", async () => {
        chai_1.expect(createdProgramArgs._id).to.be.an("object");
        chai_1.expect(createdProgramArgs.user).eql(createdUserArgs._id);
        chai_1.expect(createdProgramArgs.program).eql([]);
    });
    it("should create a ProgramExecution model", async () => {
        chai_1.expect(createdProgramExecutionArgs._id).to.be.an("object");
        chai_1.expect(createdProgramExecutionArgs.user).eql(createdUserArgs._id);
        chai_1.expect(createdProgramExecutionArgs.executions).eql([]);
    });
    // it("should create a UserDietExecution model", async () => {
    //   expect(createdDietExecutionArgs._id).to.be.an("object");
    //   expect(createdDietExecutionArgs.user).eql(createdUserArgs._id);
    //   expect(createdDietExecutionArgs.diet).eql(createdDietArgs._id);
    //   expect(createdDietExecutionArgs.executions).eql([]);
    // });
    after(() => {
        stubedUser.restore();
        stubedUserPrototype.restore();
    });
});
describe("signup controller testing respones", () => {
    let stubedUser, stubedUserPrototype;
    const req = {
        body: {
            name: "Avirambr",
            username: "aviramSport2",
            email: "test@test.com",
            password: "testpass123",
            passwordConfirmation: "testpass123",
            gender: "male",
            dateOfBirth: "02/01/2000",
        },
    };
    const res = responseDefaultObj_1.default();
    before(async () => {
        stubedUser = sinon_1.default.stub(User_1.default, "findOne");
        stubedUserPrototype = sinon_1.default.stub(User_1.default.prototype, "save");
        stubedUser.returns(false);
        stubedUserPrototype.returns({ _id: 1 });
        await authController.signup(req, res, () => { });
    });
    it("should send the correct response", () => {
        chai_1.expect(res.statusCode).equal(200);
    });
    it("should set the correct cookie name", () => {
        chai_1.expect(res.cookieName).equal("jon");
    });
    it("should set the correct token", async () => {
        const userData = stubedUserPrototype.firstCall.thisValue;
        const tokenTester = jsonwebtoken_1.default.verify(res.cookieToken, process.env.jwtSecret);
        chai_1.expect(tokenTester.userId).equal(userData._id.toString());
    });
    it("should set the correct cookie configs", () => {
        chai_1.expect(res.cookieConfig.sameSite).equal("strict");
        chai_1.expect(res.cookieConfig.path).equal("/");
        const currentDate = new Date(new Date().getTime() + 24 * 3600 * 1000 * 2);
        const currentTime = currentDate.getTime();
        const cookieExperetionTime = res.cookieConfig.expires.getTime();
        chai_1.expect(cookieExperetionTime).below(currentTime);
        chai_1.expect(res.cookieConfig.httpOnly).equal(true);
    });
    it("should send the correct message and data", () => {
        chai_1.expect(res.jsonObj.message).equal("Avirambr Sign Up Successfully");
        chai_1.expect(res.jsonObj.username).equal("aviramSport2");
    });
    after(() => {
        stubedUserPrototype.restore();
        stubedPhysicalStats.restore();
        // stubedDietExecution.restore();
        stubedProgramExecution.restore();
        stubedProgram.restore();
        stubedBcrypt.restore();
        // stubedDietModel.restore();
    });
});
//14
