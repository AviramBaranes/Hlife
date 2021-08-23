import { expect } from "chai";

import PhysicalStats from "../models/PhysicalStats";
import User from "../models/User";

type ValidationError = {
  errors: { [key: string]: { properties: { message: string } } };
};

describe("PhysicalStats model tests", () => {
  it("should be invalid if required fields are empty", () => {
    const stats = new PhysicalStats({});

    stats.validate((err: ValidationError) => {
      expect(err.errors.user.properties.message).equal(
        "Path `user` is required."
      );
      expect(err.errors.age.properties.message).equal(
        "Path `age` is required."
      );
    });
  });
  it("should be invalid if fields are not correct", () => {
    const statsFields = {
      user: "-",
      age: 111,
      rank: "-",
      stats: [{ height: 50 }],
    };
    const stats = new PhysicalStats(statsFields);

    stats.validate((err: any) => {
      expect(err.errors.user.reason.message).equal(
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
      );

      expect(err.errors.age.properties.message).equal(
        "Path `age` (111) is more than maximum allowed value (100)."
      );

      expect(err.errors.rank.properties.message).equal(
        "`-` is not a valid enum value for path `rank`."
      );

      expect(err.errors["stats.0.deservedGrade"].properties.message).equal(
        "Path `deservedGrade` is required."
      );

      expect(err.errors["stats.0.weight"].properties.message).equal(
        "Path `weight` is required."
      );

      expect(err.errors["stats.0.date"].properties.message).equal(
        "Path `date` is required."
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

    const statsFields = {
      user: user._id,
      age: 99,
      stats: [{ date: new Date(), weight: 50, deservedGrade: 20 }],
    };
    const stats = new PhysicalStats(statsFields);

    stats.validate((err: ValidationError) => {
      expect(err).equal(null);
    });
  });
});
