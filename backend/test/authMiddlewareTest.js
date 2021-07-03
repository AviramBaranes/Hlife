require("dotenv").config({ path: "./config.env" });

const { expect } = require("chai");

const authMiddleware = require("../middleware/authMiddleware");

const jwt = require("jsonwebtoken");

describe("auth middleware tests", function () {
  it("should throw error if no `jon` cookie", function () {
    const req = {
      headers: {
        cookie: "",
      },
    };
    const error = authMiddleware(req, {}, () => {});

    expect(error.statusCode).equal(401);
    expect(error.message).equal("Unauthorized Couldnt find cookie");
  });
  it("should throw error if cookie is invalid", function () {
    const req = {
      headers: {
        cookie: "jon=fake", //it splits at 'joh='
      },
    };
    const error = authMiddleware(req, {}, () => {});

    expect(error.statusCode).equal(401);
    expect(error.message).equal("Unauthorized cookie is invalid");
  });

  it("should add a userId field to request", function () {
    const payload = { userId: "123" };
    const testToken = jwt.sign(payload, process.env.jwtSecret);
    const req = {
      headers: {
        cookie: `jon=${testToken}`,
      },
    };

    authMiddleware(req, {}, () => {});

    expect(req.userId).equal("123");
  });
});
