import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import sinon from "sinon";
import { Request } from "express";

import * as authController from "../controller/auth";
import User from "../models/User";

import createCustomResponseObj from "../utils/forTests/responseDefaultObj";

describe("validateUser tests", () => {
  const req = { userId: 1 };
  const res = createCustomResponseObj();

  let stubedUser: sinon.SinonStub;

  before(async () => {
    stubedUser = sinon.stub(User, "findById");
    stubedUser.returns({
      username: "aviram",
      hasProgram: true,
      hasDiet: false,
    });
    await authController.validateUser(req as Request, res as any, () => {});
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
//2 tests
