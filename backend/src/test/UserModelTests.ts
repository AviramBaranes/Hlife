import { expect } from "chai";

import User, { UserType } from "../models/User";

describe("User model tests", () => {
  it("should be invalid if required fields are empty", () => {
    const user = new User({});

    user.validate((err: any) => {
      expect(err.errors.name.properties.message).equal(
        "Path `name` is required."
      );
      expect(err.errors.email.properties.message).equal(
        "Path `email` is required."
      );
      expect(err.errors.password.properties.message).equal(
        "Path `password` is required."
      );
      expect(err.errors.dateOfBirth.properties.message).equal(
        "Path `dateOfBirth` is required."
      );
    });
  });
  it("should be invalid if fields are not correct", () => {
    const userFields = {
      gender: "-",
      dateOfBirth: "01/01/2007",
    };
    const user = new User(userFields);

    user.validate((err: any) => {
      expect(err.errors.gender.properties.message).equal(
        "`-` is not a valid enum value for path `gender`."
      );
      expect(!!err.errors.dateOfBirth.properties.message).equal(true);
    });
  });

  it("should be a valid model with default properties", () => {
    const userFields = {
      name: "-",
      username: "-",
      email: "-",
      password: "-",
      gender: "male",
      dateOfBirth: "01/01/2005",
    };

    const user = new User(userFields) as UserType;

    user.validate((err: any) => {
      expect(err).equal(null);
    });

    expect(user.hasProgram).equal(false);
    expect(user.hasGoals).equal(false);
    expect(user.hasInitialStats).equal(false);
  });
});
