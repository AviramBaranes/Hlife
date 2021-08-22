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
        validationErrors_1.validationErrorsHandler(req);
        const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(date)); //get the day as a name
        const user = await User_1.default.findById(userId);
        //TODO add program logic to program endpoints
        if (!user.hasProgram) {
            res
                .status(401)
                .send("You need to create a full program before you declare about execution");
            return;
        }
        const program = await Program_1.default.findOne({ user: userId });
        const programOfDay = program.program.find((program) => program.day === day);
        if (programOfDay.restDay) {
            res
                .status(200)
                .send("This is a rest day, You have no exercises to complete!");
            return;
        }
        const workout = await Workout_1.default.findById(programOfDay.workout);
        const exercises = workout.exercises.map((exercise) => exercise.name);
        res.status(200).json({ exercises });
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getExercisesByDate = getExercisesByDate;
const declareAnExecution = async (req, res, next) => {
    try {
        const { userId } = req;
        const { exercises } = req.body;
        const date = req.params.date || new Date();
        validationErrors_1.validationErrorsHandler(req);
        const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(date)); //get the day as a name
        const user = await User_1.default.findById(userId);
        if (!user.hasProgram) {
            res
                .status(401)
                .send("You need to create a full program before you declare about execution");
            return;
        }
        const program = await Program_1.default.findOne({ user: userId });
        const programOfDay = program.program.find((program) => program.day === day);
        const programExecution = await ProgramExecution_1.default.findOne({ user: userId });
        if (programOfDay.restDay) {
            const currentExecution = {
                programId: programOfDay._id,
                date,
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
                programId: programOfDay._id,
                date,
                executionRate,
                grade,
            };
            programExecution.executions.push(execution);
            user.grade += grade;
        }
        await programExecution.save();
        await user.save();
        res.status(201).send("Wonderful! Your execution has been declared");
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.declareAnExecution = declareAnExecution;
const getSingleExecution = async (req, res, next) => {
    try {
        const { userId } = req;
        const stringDate = req.params.date;
        const programExecution = await ProgramExecution_1.default.findOne({ user: userId });
        if (programExecution.executions.length === 0) {
            res.status(401).send("User doesn't has any declared executions");
            return;
        }
        const date = new Date(stringDate);
        const requestedExecution = programExecution.executions.find((execution) => execution.date.toISOString() === date.toISOString());
        if (!requestedExecution) {
            res.status(401).send("No execution was found at this date");
            return;
        }
        res.status(200).json(requestedExecution);
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getSingleExecution = getSingleExecution;
const getExecutionsByRange = async (req, res, next) => {
    try {
        const { userId } = req;
        const { date, range } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user.hasProgram) {
            res.status(401).send("This user doesn't has a full program yet");
            return;
        }
        const dateObj = new Date(date);
        let executions;
        switch (range) {
            case "week":
                executions = await progExecHelpers_1.getExecutionsOfWeek(dateObj, userId);
                break;
            case "month":
                executions = await progExecHelpers_1.getExecutionsOfMonth(dateObj, userId);
                break;
            case "year":
                executions = await progExecHelpers_1.getExecutionsOfYear(dateObj, userId);
                break;
            case "all":
                executions = await progExecHelpers_1.getAllExecutions(userId);
                break;
            default:
                executions = [];
        }
        if (executions.length === 0) {
            res.status(401).send("No Executions were found in this dates");
            return;
        }
        res.status(200).json(executions);
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getExecutionsByRange = getExecutionsByRange;
