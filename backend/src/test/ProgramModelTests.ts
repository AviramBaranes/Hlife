import { expect } from "chai";

import Program from "../models/Program";
import User from "../models/User";

describe("Program model tests", () => {
  it("should be invalid if required fields are empty", () => {
    const program = new Program({});

    program.validate((err: any) => {
      expect(err.errors.user.properties.message).equal(
        "Path `user` is required."
      );
    });
  });
  it("should be invalid if fields are not correct", () => {
    const programFields = {
      user: "-",
      program: [{ day: "-", workout: "-" }],
    };
    const program = new Program(programFields);

    program.validate((err: any) => {
      expect(err.errors.user.reason.message).equal(
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
      );

      expect(err.errors["program.0.day"].properties.message).equal(
        "`-` is not a valid enum value for path `day`."
      );

      expect(err.errors["program.0.workout"].reason.message).equal(
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
      );
    });
  });

  it("should be a valid model with defaults", () => {
    const userFields = {
      name: "-",
      username: "-",
      email: "-",
      password: "-",
      gender: "male",
      dateOfBirth: "01/01/2005",
    };

    const user = new User(userFields);

    const programFields = {
      user: user._id,
      program: [{ day: "Sunday" }],
    };
    const stats = new Program(programFields);

    stats.validate((err: any) => {
      expect(err).equal(null);
    });
  });
});
