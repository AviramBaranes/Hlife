"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStats = void 0;
const valdiationErrors_1 = require("../utils/helpers/Errors/valdiationErrors");
const catchErrorsHandler_1 = require("../utils/helpers/Errors/catchErrorsHandler");
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
const Goals_1 = __importDefault(require("../models/Goals"));
const User_1 = __importDefault(require("../models/User"));
const statsHelpers_1 = require("../utils/helpers/stats/statsHelpers");
const addStats = async (req, res, next) => {
    try {
        valdiationErrors_1.validationErrorsHandler(req);
        const { userId } = req;
        const { weight, height, fatPercentage, muscelesMass, bodyImageUrl } = req.body;
        const userGoals = await Goals_1.default.findOne({ user: userId });
        if (!userGoals) {
            res.status(401).send("User's goals not found");
            return;
        }
        const user = await User_1.default.findById(userId);
        const userStats = await PhysicalStats_1.default.findOne({ user: userId });
        let grade = 15;
        let messages = [];
        let accomplishments = {};
        if (userStats.stats.length > 0) {
            const lastStatsIndex = userStats.stats.length - 1;
            const lastStatsRecord = userStats.stats[lastStatsIndex];
            const lastWeightRecord = lastStatsRecord.weight;
            const { failureMessages, goalsAchieved, calculatedGrade } = statsHelpers_1.calculateGrade(lastWeightRecord, fatPercentage, lastStatsRecord, muscelesMass, userGoals.basicGoals, userGoals.detailGoals, weight);
            grade += calculatedGrade;
            messages = [...failureMessages];
            accomplishments = { ...goalsAchieved };
        }
        const newStatsEntry = {
            date: new Date(),
            deservedGrade: grade,
            weight,
            height,
            fatPercentage,
            muscelesMass,
            bodyImageUrl,
        };
        user.grade += grade;
        userStats.stats.push(newStatsEntry);
        await user.save();
        await userStats.save();
        res
            .status(201)
            .json({ messages, currentGrade: user.grade, accomplishments });
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.addStats = addStats;
