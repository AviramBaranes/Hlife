require("dotenv").config({ path: "./config.env" });

const PhysicalStats = require("../../models/PhysicalStats");
const Diet = require("../../models/Diet");
const DietExecution = require("../../models/DietExecution");
const Program = require("../../models/Program");
const ProgramExecution = require("../../models/ProgramExecution");

module.exports = createModelsWhenSignup = async (savedUser, newUser) => {
  //age of the user:
  try {
    const now = new Date(Date.now());
    const birth = new Date(newUser.dateOfBirth);
    const age = now.getFullYear() - birth.getFullYear();

    const UserPhysicalStats = new PhysicalStats({
      user: savedUser._id,
      age,
      stats: [],
    });

    const UserDiet = new Diet({ user: savedUser._id, ingredients: [] });
    const UserProgram = new Program({
      user: savedUser._id,
      goals: {},
      program: [],
    });

    const UserProgramExecution = new ProgramExecution({
      user: savedUser._id,
      executions: [],
    });

    const UserDietSaved = await UserDiet.save();
    await UserPhysicalStats.save();
    await UserProgram.save();
    await UserProgramExecution.save();

    const UserDietExecution = new DietExecution({
      user: savedUser._id,
      diet: UserDietSaved._id,
      executions: [],
    });

    await UserDietExecution.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
