"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.changeWorkout = exports.getById = exports.getWorkoutByName = exports.createWorkout = void 0;
const Workout_1 = __importDefault(require("../models/Workout"));
const User_1 = __importDefault(require("../models/User"));
const catchErrorsHandler_1 = require("../utils/helpers/Errors/catchErrorsHandler");
const validationErrors_1 = require("../utils/helpers/Errors/validationErrors");
const createWorkout = async (req, res, next) => {
    try {
        const { userId } = req;
        const { trainingDayName, name, description, exercises, time } = req.body;
        validationErrors_1.validationErrorsHandler(req);
        const user = (await User_1.default.findById(userId));
        let isNamesValid = true;
        if (!user.workouts) {
            user.workouts = [];
        }
        user.workouts.forEach((workout) => {
            const isNameIdentical = workout.name === name;
            const isTrainingDayNameIdentical = workout.trainingDayName === trainingDayName;
            if (isNameIdentical || isTrainingDayNameIdentical) {
                isNamesValid = false;
            }
        });
        if (!isNamesValid) {
            res.status(403).send("Each workout need to have a unique name");
            return;
        }
        const workout = new Workout_1.default({
            user: userId,
            trainingDayName,
            name,
            exercises,
        });
        if (description)
            workout.description = description;
        if (time)
            workout.time = time;
        await workout.save();
        user.workouts.push({ trainingDayName, name });
        await user.save();
        return res
            .status(201)
            .send(`${trainingDayName}-workout created successfully`);
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.createWorkout = createWorkout;
const getWorkoutByName = async (req, res, next) => {
    try {
        const { userId } = req;
        const { trainingDayName } = req.query;
        validationErrors_1.validationErrorsHandler(req);
        const workout = (await Workout_1.default.findOne({
            user: userId,
            trainingDayName,
        }));
        if (!workout) {
            res
                .status(403)
                .send("couldn't find workout, make sure you create a workout with this name first.");
            return;
        }
        res.status(200).json(workout);
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getWorkoutByName = getWorkoutByName;
const getById = async (req, res, next) => {
    try {
        const { workoutId } = req.params;
        const workout = (await Workout_1.default.findById(workoutId));
        if (!workout) {
            res.status(403).send("No workout with this id");
            return;
        }
        res.status(200).json(workout);
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getById = getById;
const changeWorkout = async (req, res, next) => {
    try {
        const { userId } = req;
        const { trainingDayName, name, description, exercises, time } = req.body;
        validationErrors_1.validationErrorsHandler(req);
        const workout = (await Workout_1.default.findOne({
            user: userId,
            trainingDayName,
        }));
        if (!workout) {
            res
                .status(403)
                .send("couldn't find workout, make sure you create a workout with this name first.");
            return;
        }
        if (!name && !description && !exercises) {
            res
                .status(403)
                .send("You need to provide data in order to change the workout");
            return;
        }
        if (name)
            workout.name = name;
        if (description)
            workout.description = description;
        if (exercises)
            workout.exercises = exercises;
        if (time)
            workout.time = time;
        await workout.save();
        res.status(201).send("Workout changed successfully");
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.changeWorkout = changeWorkout;
const deleteWorkout = async (req, res, next) => {
    try {
        const { userId } = req;
        const { name } = req.params;
        validationErrors_1.validationErrorsHandler(req);
        const workout = (await Workout_1.default.findOneAndDelete({
            user: userId,
            name,
        }));
        if (!workout) {
            res
                .status(403)
                .send("couldn't find workout, make sure you create a workout with this name first.");
            return;
        }
        res.status(200).send("Workout deleted successfully");
        return;
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.deleteWorkout = deleteWorkout;
