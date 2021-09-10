"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeProgram = exports.getProgram = exports.getAllPrograms = exports.createProgram = exports.getRecommendationProgram = void 0;
const Workout_1 = __importDefault(require("../models/Workout"));
const Program_1 = __importDefault(require("../models/Program"));
const catchErrorsHandler_1 = require("../utils/helpers/Errors/catchErrorsHandler");
const validationErrors_1 = require("../utils/helpers/Errors/validationErrors");
const User_1 = __importDefault(require("../models/User"));
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
const Goals_1 = __importDefault(require("../models/Goals"));
const programHelpers_1 = require("../utils/program/programHelpers");
const initialProgramList = [
    { day: "Sunday" },
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
];
const getRecommendationProgram = async (req, res, next) => {
    try {
        const { userId } = req;
        const goals = (await Goals_1.default.findOne({ user: userId }));
        if (!goals.basicGoal) {
            res
                .status(403)
                .send("User need to create goals in order to get a recommendation program");
            return;
        }
        const user = (await User_1.default.findById(userId));
        const physicalStats = (await PhysicalStats_1.default.findOne({
            user: userId,
        }));
        let recommendation;
        switch (user.gender) {
            case "female":
                recommendation = programHelpers_1.calculateFemaleRecommendationProgram(goals.basicGoal, physicalStats.rank);
                break;
            case "male":
                recommendation = programHelpers_1.calculateMaleRecommendationProgram(goals.basicGoal, physicalStats.rank);
                break;
        }
        res.status(200).json(recommendation);
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getRecommendationProgram = getRecommendationProgram;
const createProgram = async (req, res, next) => {
    try {
        const { userId } = req;
        const { day } = req.params;
        const { trainingDayName } = req.body;
        validationErrors_1.validationErrorsHandler(req);
        let workout;
        if (trainingDayName) {
            workout = (await Workout_1.default.findOne({
                trainingDayName,
                user: userId,
            }));
        }
        if (!workout && trainingDayName) {
            res
                .status(403)
                .send("Couldn't find a workout with this name, make sure you create one first");
            return;
        }
        const program = (await Program_1.default.findOne({ user: userId }));
        //create new model
        if (program.program.length === 0) {
            const programList = [...initialProgramList];
            const programDayIndex = programList.findIndex((program) => program.day === day);
            const programDay = programList[programDayIndex];
            if (workout) {
                programDay.workout = workout._id;
                programDay.restDay = false;
            }
            else {
                programDay.restDay = true;
            }
            programList[programDayIndex] = programDay;
            program.program = programList;
            await program.save();
        }
        //edit existing model
        else {
            const programList = program.program;
            const programDayIndex = programList.findIndex((program) => program.day === day);
            const isDayAlreadySet = programList[programDayIndex].restDay ||
                programList[programDayIndex].workout;
            if (isDayAlreadySet) {
                res.status(403).send("This day already has a program");
                return;
            }
            const programDay = programList[programDayIndex];
            if (workout) {
                programDay.workout = workout._id;
                programDay.restDay = false;
            }
            else {
                programDay.restDay = true;
            }
            programList[programDayIndex] = programDay;
            program.program = programList;
            await program.save();
            let programFull = true;
            program.program.forEach((program, _, programs) => {
                if (programs.length !== 7) {
                    programFull = false;
                    return;
                }
                if (!program.restDay && !program.workout)
                    programFull = false;
            });
            if (programFull) {
                const user = (await User_1.default.findById(userId));
                user.hasProgram = true;
                user.grade += 100;
                await user.save();
            }
        }
        res.status(201).send("Program added successfully");
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.createProgram = createProgram;
const getAllPrograms = async (req, res, next) => {
    try {
        const { userId } = req;
        const program = (await Program_1.default.findOne({ user: userId }));
        if (!program) {
            res.status(403).send("Something wrong... this user has no program");
            return;
        }
        const programFull = program.program.every((program) => program.restDay || program.workout);
        if (!programFull) {
            res
                .status(403)
                .send("You need to create a program for each day in order to request them");
            return;
        }
        res.status(200).json(program.program);
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getAllPrograms = getAllPrograms;
const getProgram = async (req, res, next) => {
    try {
        const { userId } = req;
        const { day } = req.params;
        validationErrors_1.validationErrorsHandler(req);
        const program = (await Program_1.default.findOne({ user: userId }));
        if (program.program.length === 0) {
            res.status(403).send("No program was found for the user");
            return;
        }
        const requestedProgram = program.program.find((program) => program.day === day);
        const isProgramAlreadySet = requestedProgram.restDay || requestedProgram.workout;
        if (!isProgramAlreadySet) {
            res
                .status(403)
                .send("No program was set at this day yet, make sure you create one");
            return;
        }
        res.status(200).json(requestedProgram);
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getProgram = getProgram;
const changeProgram = async (req, res, next) => {
    try {
        const { userId } = req;
        const { day } = req.params;
        const { trainingDayName, restDay } = req.body;
        validationErrors_1.validationErrorsHandler(req);
        if (trainingDayName && restDay) {
            res.status(403).send("You can't set a workout day as a rest day");
            return;
        }
        const program = (await Program_1.default.findOne({ user: userId }));
        if (!program) {
            res.status(403).send("No program was found for the user");
            return;
        }
        const requestedProgram = {
            ...program.program.find((program) => program.day === day),
        };
        const isProgramAlreadySet = requestedProgram.restDay || requestedProgram.workout;
        if (!isProgramAlreadySet) {
            res
                .status(403)
                .send("No program was set at this day yet, make sure you create one");
            return;
        }
        let workout;
        if (trainingDayName) {
            workout = (await Workout_1.default.findOne({
                user: userId,
                trainingDayName,
            }));
        }
        if (!workout && trainingDayName) {
            res
                .status(403)
                .send("Couldn't find a workout with this name, make sure you create one first");
            return;
        }
        if (workout)
            requestedProgram.workout = workout._id;
        if (requestedProgram.workout && restDay)
            delete requestedProgram.workout;
        requestedProgram.restDay = restDay;
        const requestedProgramIndex = program.program.findIndex((program) => program.day === day);
        program.program[requestedProgramIndex] = { ...requestedProgram };
        await program.save();
        res.status(201).send("Program updated successfully");
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.changeProgram = changeProgram;
