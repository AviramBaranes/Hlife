import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { ObjectId } from "mongoose";

import PhysicalStats from "../../../models/PhysicalStats";
// import Diet from "../../../models/Diet";
// import DietExecution from "../../../models/DietExecution";
import Program from "../../../models/Program";
import ProgramExecution from "../../../models/ProgramExecution";
import { UserType } from "../../../models/User";

const createModelsWhenSignup = async (newUser: UserType) => {
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

    // const UserDiet = new Diet({ user: newUser._id, ingredients: [] });
    const UserProgram = new Program({
      user: newUser._id,
      program: [],
    });

    const UserProgramExecution = new ProgramExecution({
      user: newUser._id,
      executions: [],
    });

    // await UserDiet.save();
    await UserPhysicalStats.save();
    await UserProgram.save();
    await UserProgramExecution.save();

    // const UserDietExecution = new DietExecution({
    //   user: newUser._id,
    //   diet: UserDiet._id,
    //   executions: [],
    // });

    // await UserDietExecution.save();
  } catch (err) {
    throw err;
  }
};
export default createModelsWhenSignup;
