require("dotenv").config({ path: "./config.env" });

const PhysicalStats = require("../../models/PhysicalStats");
const Diet = require("../../models/Diet");
const DietExecution = require("../../models/DietExecution");
const Program = require("../../models/Program");
const ProgramExecution = require("../../models/ProgramExecution");

module.exports = createModelsWhenSignup = async (newUser) => {
  //age of the user:
  try {
    const now = new Date(Date.now());
    const birth = new Date(newUser.dateOfBirth);
    const age = now.getFullYear() - birth.getFullYear();

    const UserPhysicalStats = new PhysicalStats({
      user: newUser._id,
      age,
      stats: [],
    });

    const UserDiet = new Diet({ user: newUser._id, ingredients: [] });
    const UserProgram = new Program({
      user: newUser._id,
      goals: {},
      program: [],
    });

    const UserProgramExecution = new ProgramExecution({
      user: newUser._id,
      executions: [],
    });

    await UserDiet.save();
    await UserPhysicalStats.save();
    await UserProgram.save();
    await UserProgramExecution.save();

    const UserDietExecution = new DietExecution({
      user: newUser._id,
      diet: UserDiet._id,
      executions: [],
    });

    await UserDietExecution.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
