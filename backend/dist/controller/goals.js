"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoals = exports.changeGoals = exports.changeBasicGoal = exports.createGoal = void 0;
const Goals_1 = __importDefault(require("../models/Goals"));
const User_1 = __importDefault(require("../models/User"));
const catchErrorsHandler_1 = require("../utils/helpers/Errors/catchErrorsHandler");
const validationErrors_1 = require("../utils/helpers/Errors/validationErrors");
const createGoal = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { userId } = req;
        const { basicGoal, weight, fatPercentage, musclesMass } = req.body;
        const user = (await User_1.default.findById(userId));
        if (user.hasGoals) {
            res.status(403).send('User already created goals');
            return;
        }
        if (basicGoal === 'lose fat' && !fatPercentage) {
            res
                .status(403)
                .send('If you want to lose fat you need to provide your fat percentage');
            return;
        }
        if (basicGoal === 'increase muscles mass' && !musclesMass) {
            res
                .status(403)
                .send('If you want to increase muscles mass you need to provide your muscles mass');
            return;
        }
        const userGoals = new Goals_1.default({
            user: userId,
            basicGoal,
            detailGoals: {
                weight,
                fatPercentage,
                musclesMass,
            },
        });
        await userGoals.save();
        user.hasGoals = true;
        user.save();
        res.status(201).send('Goals created successfully');
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.createGoal = createGoal;
const changeBasicGoal = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { userId } = req;
        const { fatPercentage, musclesMass } = req.body;
        const userGoals = (await Goals_1.default.findOne({ user: userId }));
        if (!userGoals) {
            res.status(403).send('Goals have not created yet for this user');
            return;
        }
        let basicGoal = userGoals.basicGoal;
        const noFatPercentageBefore = !userGoals.detailGoals.fatPercentage;
        const noMusclesMassBefore = !userGoals.detailGoals.musclesMass;
        if (basicGoal === 'increase muscles mass') {
            if (noFatPercentageBefore && !fatPercentage) {
                res
                    .status(403)
                    .send('If you want to lose fat you need to provide your fat percentage');
                return;
            }
            if (noFatPercentageBefore) {
                userGoals.detailGoals.fatPercentage = fatPercentage;
            }
            basicGoal = 'lose fat';
        }
        else {
            if (noMusclesMassBefore && !musclesMass) {
                res
                    .status(403)
                    .send('If you want to increase muscles mass you need to provide your muscles mass');
                return;
            }
            if (noMusclesMassBefore) {
                userGoals.detailGoals.musclesMass = musclesMass;
            }
            basicGoal = 'increase muscles mass';
        }
        userGoals.basicGoal = basicGoal;
        await userGoals.save();
        res.status(201).send('Goals updated');
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.changeBasicGoal = changeBasicGoal;
const changeGoals = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { userId } = req;
        const { weight, fatPercentage, musclesMass } = req.body;
        const userGoals = (await Goals_1.default.findOne({ user: userId }));
        if (!userGoals) {
            res.status(403).send('Goals have not created yet for this user');
            return;
        }
        if (!weight && !fatPercentage && !musclesMass) {
            res.status(403).send('No parameters were provided');
            return;
        }
        if (weight)
            userGoals.detailGoals.weight = weight;
        if (fatPercentage)
            userGoals.detailGoals.fatPercentage = fatPercentage;
        if (musclesMass)
            userGoals.detailGoals.musclesMass = musclesMass;
        await userGoals.save();
        res.status(201).send('Goals updated');
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.changeGoals = changeGoals;
const getGoals = async (req, res, next) => {
    try {
        const { userId } = req;
        const userGoals = (await Goals_1.default.findOne({ user: userId }));
        if (!userGoals) {
            res.status(403).send('Goals have not created yet for this user');
            return;
        }
        const { basicGoal, detailGoals } = userGoals;
        res.status(201).json({ basicGoal, detailGoals });
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.getGoals = getGoals;
