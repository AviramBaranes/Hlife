"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const PhysicalStats_1 = __importDefault(require("../../../models/PhysicalStats"));
// import Diet from "../../../models/Diet";
// import DietExecution from "../../../models/DietExecution";
const Program_1 = __importDefault(require("../../../models/Program"));
const ProgramExecution_1 = __importDefault(require("../../../models/ProgramExecution"));
const createModelsWhenSignup = async (newUser) => {
    //age of the user:
    try {
        const now = new Date(Date.now());
        const birth = new Date(newUser.dateOfBirth);
        const age = now.getFullYear() - birth.getFullYear();
        const UserPhysicalStats = new PhysicalStats_1.default({
            user: newUser._id,
            age,
            stats: [],
        });
        // const UserDiet = new Diet({ user: newUser._id, ingredients: [] });
        const UserProgram = new Program_1.default({
            user: newUser._id,
            program: [],
        });
        const UserProgramExecution = new ProgramExecution_1.default({
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
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
exports.default = createModelsWhenSignup;
