"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecutionsByRange = exports.getSingleExecution = exports.declareAnExecution = exports.getExercisesByDate = void 0;
//helpers
const catchErrorsHandler_1 = require("../utils/helpers/Errors/catchErrorsHandler");
const validationErrors_1 = require("../utils/helpers/Errors/validationErrors");
//models
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const ProgramExecution_1 = __importDefault(require("../models/ProgramExecution"));
const Program_1 = __importDefault(require("../models/Program"));
const progExecHelpers_1 = require("../utils/helpers/programExecution/progExecHelpers");
const getExercisesByDate = async (req, res, next) => {
    try {
        const { userId } = req;
        const date = req.params.date || new Date();
        (0, validationErrors_1.validationErrorsHandler)(req);
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date)); //get the day as a name
        const user = (await User_1.default.findById(userId));
        //TODO add program logic to program endpoints
        if (!user.hasProgram) {
            res
                .status(403)
                .send('You need to create a full program before you declare about execution');
            return;
        }
        const program = (await Program_1.default.findOne({ user: userId }));
        const programOfDay = program.program.find((program) => program.day === day);
        if (programOfDay.restDay) {
            res
                .status(200)
                .send('This is a rest day, You have no exercises to complete!');
            return;
        }
        const workout = (await Workout_1.default.findById(programOfDay.workout));
        const { name, trainingDayName, time, exercises } = workout;
        res.status(200).json({ exercises, name, trainingDayName, time });
        return;
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.getExercisesByDate = getExercisesByDate;
const declareAnExecution = async (req, res, next) => {
    try {
        const { userId } = req;
        const { exercises, isAerobic } = req.body;
        const date = req.params.date || new Date();
        (0, validationErrors_1.validationErrorsHandler)(req);
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date)); //get the day as a name
        const user = (await User_1.default.findById(userId));
        if (!user.hasProgram) {
            res
                .status(403)
                .send('You need to create a full program before you declare about execution');
            return;
        }
        const program = (await Program_1.default.findOne({ user: userId }));
        const programOfDay = program.program.find((program) => program.day === day);
        const programExecution = (await ProgramExecution_1.default.findOne({
            user: userId,
        }));
        let modifiedDate = date;
        if (!req.params.date) {
            modifiedDate = new Date(new Date(date).setHours(0, 0, 0, 0));
        }
        const isDeclaredAlready = programExecution.executions.find((program) => new Date(program.date).getTime() === new Date(modifiedDate).getTime());
        if (isDeclaredAlready) {
            res.status(403).send('You already declared the execution at this day');
            return;
        }
        if (programOfDay.restDay || isAerobic) {
            const currentExecution = {
                date: modifiedDate,
                executionRate: 100,
                grade: 10,
            };
            programExecution.executions.push(currentExecution);
            user.grade += currentExecution.grade;
        }
        else {
            const numberOfExercises = Object.keys(exercises).length;
            const valueOfEachExercise = 100 / numberOfExercises;
            let numberOfExercisesDone = 0;
            for (let exercise in exercises) {
                if (exercises[exercise] === true)
                    numberOfExercisesDone++;
            }
            const executionRate = Math.ceil(valueOfEachExercise * numberOfExercisesDone);
            const grade = Math.ceil(executionRate / 10);
            const execution = {
                date: modifiedDate,
                executionRate,
                grade,
            };
            if (programOfDay === null || programOfDay === void 0 ? void 0 : programOfDay.workout)
                execution.workoutId = programOfDay.workout;
            programExecution.executions.push(execution);
            user.grade += grade;
        }
        await programExecution.save();
        await user.save();
        res.status(201).send('Wonderful! Your execution has been declared');
        return;
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.declareAnExecution = declareAnExecution;
const getSingleExecution = async (req, res, next) => {
    try {
        const { userId } = req;
        const stringDate = req.params.date;
        (0, validationErrors_1.validationErrorsHandler)(req);
        const programExecution = (await ProgramExecution_1.default.findOne({
            user: userId,
        }));
        if (programExecution.executions.length === 0) {
            res.status(403).send("User doesn't has any declared executions");
            return;
        }
        const date = new Date(stringDate);
        const requestedExecution = programExecution.executions.find((execution) => execution.date.toLocaleDateString() === date.toLocaleDateString());
        if (!requestedExecution) {
            res.status(403).send('No execution was found at this date');
            return;
        }
        res.status(200).json(requestedExecution);
        return;
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.getSingleExecution = getSingleExecution;
const getExecutionsByRange = async (req, res, next) => {
    try {
        const { userId } = req;
        const { date, range } = req.params;
        (0, validationErrors_1.validationErrorsHandler)(req);
        const user = (await User_1.default.findById(userId));
        if (!user.hasProgram) {
            res.status(403).send("This user doesn't has a full program yet");
            return;
        }
        const dateObj = new Date(date);
        let executions;
        switch (range) {
            case 'week':
                executions = await (0, progExecHelpers_1.getExecutionsOfWeek)(dateObj, userId);
                break;
            case 'month':
                executions = await (0, progExecHelpers_1.getExecutionsOfMonth)(dateObj, userId);
                break;
            case 'year':
                executions = await (0, progExecHelpers_1.getExecutionsOfYear)(dateObj, userId);
                break;
            case 'all':
                executions = await (0, progExecHelpers_1.getAllExecutions)(userId);
                break;
            default:
                executions = [];
        }
        if (executions.length === 0) {
            res.status(204).send('No Executions were found in this dates');
            return;
        }
        res.status(200).json(executions);
        return;
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.getExecutionsByRange = getExecutionsByRange;
// export const createDummyData: RequestHandler = async (req, res, next) => {
//   try {
//     const { userId } = req;
//     const dates = [
//       '10-01-2021',
//       '10-02-2021',
//       '10-03-2021',
//       '10-04-2021',
//       '10-05-2021',
//       '10-06-2021',
//       '10-07-2021',
//       '10-08-2021',
//       '10-09-2021',
//       '10-10-2021',
//       '10-11-2021',
//       '10-12-2021',
//       '10-13-2021',
//       '10-14-2021',
//       '10-15-2021',
//       '10-16-2021',
//       '10-17-2021',
//       '10-18-2021',
//       '10-19-2021',
//       '10-20-2021',
//       '10-21-2021',
//       '10-22-2021',
//       '10-23-2021',
//       '10-24-2021',
//       '10-25-2021',
//       '10-26-2021',
//       '10-27-2021',
//       '10-28-2021',
//       '10-29-2021',
//       '10-30-2021',
//     ];
//     let counter = 0;
//     // validationErrorsHandler(req);
//     //get the day as a name
//     // const user = (await User.findById(userId)) as UserType;
//     // const program = (await Program.findOne({ user: userId })) as ProgramType;
//     // const programOfDay = program.program.find((program) => program.day === day);
//     const programExecution = await ProgramExecution.findOne({ user: userId });
//     while (counter < 29) {
//       const date = new Date(dates[counter]);
//       let rate = Math.random() * 120;
//       const executionRate = rate > 100 ? 100 : rate;
//       const execution = {
//         programId: '6176790215381809aca95aaf',
//         date,
//         executionRate,
//       };
//       programExecution.executions.push(execution);
//       counter++;
//     }
//     await programExecution.save();
//     res.status(201).send('Wonderful! Your execution has been declared');
//     return;
//   } catch (err: any) {
//     catchErrorHandler(err, next);
//   }
// };
