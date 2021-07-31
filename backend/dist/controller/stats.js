"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLastStats = exports.deleteLastStats = exports.getAllStats = exports.getStatsByDate = exports.getAllStatsDates = exports.addStats = void 0;
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
            const { failureMessages, goalsAchieved, calculatedGrade } = statsHelpers_1.calculateGrade(lastWeightRecord, fatPercentage, lastStatsRecord, muscelesMass, userGoals.basicGoals, userGoals.detailGoals, weight, messages);
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
        await userStats.save();
        await user.save();
        res
            .status(201)
            .json({ messages, currentGrade: user.grade, accomplishments });
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.addStats = addStats;
const getAllStatsDates = async (req, res, next) => {
    try {
        const { userId } = req;
        const userStats = await PhysicalStats_1.default.findOne({ user: userId });
        if (!userStats) {
            res.status(401).send("No stats were found for this user");
            return;
        }
        if (userStats.stats.length === 0) {
            res.status(401).send("No stats were created yet");
            return;
        }
        const statsDates = userStats.stats.map((stats) => stats.date);
        res.status(200).json({ statsDates: [...statsDates] });
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getAllStatsDates = getAllStatsDates;
const getStatsByDate = async (req, res, next) => {
    try {
        const { userId } = req;
        const { date } = req.params;
        const userStats = await PhysicalStats_1.default.findOne({ user: userId });
        if (!userStats) {
            res.status(401).send("No stats were found for this user");
            return;
        }
        const requestedStats = userStats.stats.find((stats) => stats.date.toString() === date);
        if (!requestedStats) {
            res.status(401).send("Invalid date, no stats were entered at this date");
            return;
        }
        res.status(200).json({ ...requestedStats });
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getStatsByDate = getStatsByDate;
const getAllStats = async (req, res, next) => {
    try {
        const { userId } = req;
        const userStats = await PhysicalStats_1.default.findOne({ user: userId });
        if (!userStats) {
            res.status(401).send("No stats were found for this user");
            return;
        }
        if (userStats.stats.length === 0) {
            res.status(401).send("No stats were created yet");
            return;
        }
        res.status(200).json({ stats: [...userStats.stats] });
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.getAllStats = getAllStats;
const deleteLastStats = async (req, res, next) => {
    try {
        const { userId } = req;
        const userStats = await PhysicalStats_1.default.findOne({ user: userId });
        if (!userStats) {
            res.status(401).send("No stats were found for this user");
            return;
        }
        if (userStats.stats.length === 0) {
            res.status(401).send("No stats were created yet");
            return;
        }
        const lastStatsIndex = userStats.stats.length - 1;
        const lastStats = userStats.stats[lastStatsIndex];
        const currentTime = new Date().getTime();
        const lastStatsTime = Date.parse(lastStats.date);
        const dayInMS = 100 * 60 * 60 * 24; //one day in ms
        const allowedToDelete = currentTime - lastStatsTime < dayInMS;
        if (!allowedToDelete) {
            res
                .status(401)
                .send("It's been over 24 hours since the last stats were created, You can't delete them");
            return;
        }
        userStats.stats.pop();
        await userStats.save();
        res.status(200).send("The last stats were deleted");
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.deleteLastStats = deleteLastStats;
const changeLastStats = async (req, res, next) => {
    try {
        const { userId } = req;
        const { weight, height, fatPercentage, muscelesMass, bodyImageUrl } = req.body;
        const userStats = await PhysicalStats_1.default.findOne({ user: userId });
        if (!userStats) {
            res.status(401).send("No stats were found for this user");
            return;
        }
        if (userStats.stats.length === 0) {
            res.status(401).send("No stats were created yet");
            return;
        }
        const lastStatsIndex = userStats.stats.length - 1;
        const lastStats = userStats.stats[lastStatsIndex];
        const currentTime = new Date().getTime();
        const lastStatsTime = Date.parse(lastStats.date);
        const dayInMS = 100 * 60 * 60 * 24; //one day in ms
        const allowedToChange = currentTime - lastStatsTime < dayInMS;
        if (!allowedToChange) {
            res
                .status(401)
                .send("It's been over 24 hours since the last stats were created, You can't change them");
            return;
        }
        const noData = !weight && !height && !fatPercentage && !muscelesMass && !bodyImageUrl;
        if (noData) {
            res.status(401).send("No data was provided");
            return;
        }
        if (weight)
            lastStats.weight = weight;
        if (height)
            lastStats.height = height;
        if (fatPercentage)
            lastStats.fatPercentage = fatPercentage;
        if (muscelesMass)
            lastStats.muscelesMass = muscelesMass;
        if (bodyImageUrl)
            lastStats.bodyImageUrl = bodyImageUrl;
        await userStats.save();
        res.status(200).send("The last stats were updated");
    }
    catch (err) {
        catchErrorsHandler_1.catchErrorHandler(err, next);
    }
};
exports.changeLastStats = changeLastStats;
