import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { expect } from "chai";
import jwt from "jsonwebtoken";

import authMiddleware from "../middleware/authMiddleware";
import { CustomError } from "../types/error";

describe("auth middleware tests", function () {
  it("should throw error if no `jon` cookie", function () {
    const req = {
      headers: {
        cookie: "",
      },
    };
    const error = authMiddleware(
      req as any,
      {} as any,
      () => {}
    ) as CustomError;

    expect(error.statusCode).equal(401);
    expect(error.message).equal("Unauthorized Couldn't find cookie");
  });
  it("should throw error if cookie is invalid", function () {
    const req = {
      headers: {
        cookie: "jon=fake", //it splits at 'joh='
      },
    };
    const error = authMiddleware(
      req as any,
      {} as any,
      () => {}
    ) as CustomError;

    expect(error.statusCode).equal(401);
    expect(error.message).equal("Unauthorized cookie is invalid");
  });

  it("should add a userId field to request", function () {
    const payload = { userId: "123" };
    const testToken = jwt.sign(payload, process.env.jwtSecret as string);
    const req = {
      userId: "",
      headers: {
        cookie: `jon=${testToken}`,
      },
    };

    authMiddleware(req as any, {} as any, () => {});

    expect(req.userId).equal("123");
  });
});

//3 tests
