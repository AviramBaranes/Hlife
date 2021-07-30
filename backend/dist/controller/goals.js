"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoal = void 0;
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
