"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoals = exports.changeGoals = exports.changeBasicGoal = exports.createGoal = void 0;
const Goals_1 = __importDefault(require("../models/Goals"));
const catchErrorsHandler_1 = require("../utils/helpers/Errors/catchErrorsHandler");
const valdiationErrors_1 = require("../utils/helpers/Errors/valdiationErrors");
const createGoal = async (req, res, next) => {
    try {
        valdiationErrors_1.validationErrorsHandler(req);
        const { userId } = req;
        const { basicGoal, weight, fatPercentage, muscelesMass } = req.body;
        const userGoals = new Goals_1.default({
            user: userId,
            basicGoal,
            detailGoals: {
                weight,
                fatPercentage,
                muscelesMass,
            },
        });
        await userGoals.save();
        res.status(201).send("Goals created successfully");
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.createGoal = createGoal;
const changeBasicGoal = async (req, res, next) => {
    try {
        valdiationErrors_1.validationErrorsHandler(req);
        const { userId } = req;
        const userGoals = await Goals_1.default.findOne({ user: userId });
        if (!userGoals) {
            res.status(401).send("Goals have not created yet for this user");
            return;
        }
        let basicGoal = userGoals.basicGoal;
        if (basicGoal === "gain weight") {
            basicGoal = "lose weight";
        }
        else {
            basicGoal = "gain weight";
        }
        userGoals.basicGoal = basicGoal;
        await userGoals.save();
        res.status(201).send("Goals updated");
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.changeBasicGoal = changeBasicGoal;
const changeGoals = async (req, res, next) => {
    try {
        valdiationErrors_1.validationErrorsHandler(req);
        const { userId } = req;
        const { weight, fatPercentage, muscelesMass } = req.body;
        const userGoals = await Goals_1.default.findOne({ user: userId });
        if (!userGoals) {
            res.status(401).send("Goals have not created yet for this user");
            return;
        }
        if (!weight && !fatPercentage && !muscelesMass) {
            res.status(401).send("No parameters were provided");
            return;
        }
        if (weight)
            userGoals.detailedGoals.weight = weight;
        if (fatPercentage)
            userGoals.detailedGoals.fatPercentage = fatPercentage;
        if (muscelesMass)
            userGoals.detailedGoals.muscelesMass = muscelesMass;
        await userGoals.save();
        res.status(201).send("Goals updated");
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.changeGoals = changeGoals;
const getGoals = async (req, res, next) => {
    try {
        const { userId } = req;
        const userGoals = await Goals_1.default.findOne({ user: userId });
        if (!userGoals) {
            res.status(401).send("Goals have not created yet for this user");
            return;
        }
        res.status(201).json({ ...userGoals });
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getGoals = getGoals;
