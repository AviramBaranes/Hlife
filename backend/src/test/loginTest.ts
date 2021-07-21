import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

//test tools
import { expect } from "chai";
import sinon from "sinon";

//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//controller to test
import * as authController from "../controller/auth";

//models and connections
import User from "../models/User";

//utils
import createCustomResponseObj from "../utils/forTests/responseDefaultObj";
import { CustomError } from "../types/error";

describe("login controller error handling tests", () => {
  let stubedUser: sinon.SinonStub;
  const req = {
    body: { email: "fakeEmail@fake.com", password: "123456" },
  };
  const res = createCustomResponseObj();
  it("should return an error response if email not exist", async function () {
    stubedUser = sinon.stub(User, "findOne");

    stubedUser.returns({
      select: sinon.stub().returns(false),
    });

    await authController.login(req as any, res as any, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("User not found, Make sure the email is correct");
  });

  it("should return an error response if password is incorrect", async () => {
    req.body.email = "test@test.com";
    req.body.password = "123456";

    const stubedBcrypt = sinon.stub(bcrypt, "compare") as sinon.SinonStub;

    stubedUser.returns({
      select: sinon.stub().returns(true),
    });
    stubedBcrypt.returns(false);

    await authController.login(req as any, res as any, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal("Password is invalid");

    stubedBcrypt.restore();
  });

  it("should throw a default error", async () => {
    stubedUser.throws();

    const error = (await authController.login(
      req as any,
      {} as any,
      () => {}
    )) as CustomError;

    expect(error.statusCode).equal(500);

    stubedUser.restore();
  });
});

describe("login controller testing response", () => {
  let stubedUser, req;
  const res = createCustomResponseObj();

  it("should return 200 status code", async () => {
    req = {
      body: {
        email: "test@test.com",
        password: "123456",
      },
    };
    stubedUser = sinon.stub(User, "findOne");
    const stubedBcrypt = sinon.stub(bcrypt, "compare") as sinon.SinonStub;

    stubedUser.returns({
      select: sinon.stub().returns({
        name: "aviram",
        _id: 1,
        username: "avi123",
        hasProgram: true,
        hasDiet: false,
      }),
    });
    stubedBcrypt.returns(true);

    await authController.login(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);

    stubedUser.restore();
    stubedBcrypt.restore();
  });

  it("should return the correct cookie", () => {
    const { userId } = jwt.verify(
      res.cookieToken,
      process.env.jwtSecret as string
    ) as { userId: string };
    expect(res.cookieName).equal("jon");
    expect(userId).equal(1);
  });

  it("should return the correct cookie settings", function () {
    expect(res.cookieConfig.sameSite).equal("strict");
    expect(res.cookieConfig.path).equal("/");
    const currentDate = new Date(new Date().getTime() + 24 * 3600 * 1000 * 2);
    const currentTime = currentDate.getTime();
    const cookieExperetionTime = res.cookieConfig.expires.getTime();
    expect(cookieExperetionTime).below(currentTime);
    expect(res.cookieConfig.httpOnly).equal(true);
  });
  it("should send the correct message and data", function () {
    expect(res.jsonObj.message).equal("aviram Logged In Successfully!");
    expect(res.jsonObj.username).equal("avi123");
    expect(res.jsonObj.hasProgram).equal(true);
    expect(res.jsonObj.hasDiet).equal(false);
  });
});
//7 tests
