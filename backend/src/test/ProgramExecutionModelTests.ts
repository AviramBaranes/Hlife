import { expect } from "chai";

import ProgramExecution from "../models/ProgramExecution";
import User from "../models/User";

describe("ProgramExecution model tests", () => {
  it("should be invalid if required fields are empty", () => {
    const programExec = new ProgramExecution({});

    programExec.validate((err: any) => {
      expect(err.errors.user.properties.message).equal(
        "Path `user` is required."
      );
    });
  });

  it("should be invalid if fields are not correct 1", () => {
    const programExecFields = {
      user: "-",
      executions: [{}],
    };
    const programExec = new ProgramExecution(programExecFields);

    programExec.validate((err: any) => {
      expect(err.errors.user.reason.message).equal(
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
      );

      expect(err.errors["executions.0.programId"].properties.message).equal(
        "Path `programId` is required."
      );

      expect(err.errors["executions.0.executionRate"].properties.message).equal(
        "Path `executionRate` is required."
      );

      expect(err.errors["executions.0.date"].properties.message).equal(
        "Path `date` is required."
      );
    });
  });

  it("should be invalid if fields are not correct 2", () => {
    const programExecFields = {
      user: "-",
      executions: [
        { programId: "-", date: "-", executionRate: 111, grade: 11 },
      ],
    };
    const programExec = new ProgramExecution(programExecFields);

    programExec.validate((err: any) => {
      expect(
        err.errors["executions.0.date"].reason.message.split(":")[0]
      ).equal("The expression evaluated to a falsy value");

      expect(err.errors["executions.0.programId"].reason.message).equal(
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
      );

      expect(err.errors["executions.0.executionRate"].properties.message).equal(
        "Path `executionRate` (111) is more than maximum allowed value (100)."
      );

      expect(err.errors["executions.0.grade"].properties.message).equal(
        "Path `grade` (11) is more than maximum allowed value (10)."
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

    const programExecFields = {
      user: user._id,
      executions: [
        { programId: user._id, date: new Date(), executionRate: 50, grade: 5 },
      ],
    };
    const programExec = new ProgramExecution(programExecFields);

    programExec.validate((err: any) => {
      expect(err).equal(null);
    });
  });
});
