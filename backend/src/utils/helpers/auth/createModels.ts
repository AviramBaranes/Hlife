import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import PhysicalStats from '../../../models/PhysicalStats';
import Program from '../../../models/Program';
import ProgramExecution from '../../../models/ProgramExecution';
import { UserType } from '../../../models/User';

const createModelsWhenSignup = async (newUser: UserType) => {
  try {
    const now = new Date(Date.now());
    const birth = new Date(newUser.dateOfBirth);
    const age = now.getFullYear() - birth.getFullYear();

    const UserPhysicalStats = new PhysicalStats({
      user: newUser._id,
      age,
      stats: [],
    });

    const UserProgram = new Program({
      user: newUser._id,
      program: [],
    });

    const UserProgramExecution = new ProgramExecution({
      user: newUser._id,
      executions: [],
    });

    await UserPhysicalStats.save();
    await UserProgram.save();
    await UserProgramExecution.save();
  } catch (err) {
    throw err;
  }
};
export default createModelsWhenSignup;
