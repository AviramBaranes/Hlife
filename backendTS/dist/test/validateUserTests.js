"use strict";
require("dotenv").config({ path: "./config.env" });
const { expect } = require("chai");
const sinon = require("sinon");
const authController = require("../controller/auth");
const User = require("../models/User");
const fakeResponseObj = require("../utils/forTests/responseDefaultObj");
describe("validateUser tests", function () {
    const req = { userId: 1 };
    const res = fakeResponseObj();
    let stubedUser;
    before(async () => {
        stubedUser = sinon.stub(User, "findById");
        stubedUser.returns({
            username: "aviram",
            hasProgram: true,
            hasDiet: false,
        });
        await authController.validateUser(req, res, () => { });
    });
    it("should set the right status code in res", () => {
        expect(res.statusCode).equal(200);
    });
    it("should set the right json data in res", () => {
        expect(res.jsonObj.isAuthenticated).equal(true);
        expect(res.jsonObj.username).equal("aviram");
        expect(res.jsonObj.hasProgram).equal(true);
        expect(res.jsonObj.hasDiet).equal(false);
        expect(res.jsonObj.userId).equal(1);
    });
    after(() => {
        stubedUser.restore();
    });
});
