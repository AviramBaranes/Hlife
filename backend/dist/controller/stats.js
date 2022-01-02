"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRanking = exports.changeLastStats = exports.deleteLastStats = exports.getAllStats = exports.getStatsByDate = exports.getAllStatsDates = exports.addStats = void 0;
const validationErrors_1 = require("../utils/helpers/Errors/validationErrors");
const catchErrorsHandler_1 = require("../utils/helpers/Errors/catchErrorsHandler");
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
const Goals_1 = __importDefault(require("../models/Goals"));
const User_1 = __importDefault(require("../models/User"));
const statsHelpers_1 = require("../utils/helpers/stats/statsHelpers");
const addStats = async (req, res, next) => {
    try {
        (0, validationErrors_1.validationErrorsHandler)(req);
        const { userId } = req;
        const { weight, height, fatPercentage, musclesMass } = req.body;
        let bodyImageUrl;
        if (req.file) {
            const { path } = req.file;
            bodyImageUrl = path.replace('\\', '/').split('public')[1];
        }
        const userGoals = (await Goals_1.default.findOne({ user: userId }));
        if (!userGoals) {
            res.status(403).send("User's goals not found");
            return;
        }
        const user = (await User_1.default.findById(userId));
        const userStats = (await PhysicalStats_1.default.findOne({
            user: userId,
        }));
        const date = new Date(new Date().setHours(0, 0, 0, 0));
        let grade = 15;
        let messages = [];
        let accomplishments = {};
        if (userStats.stats.length > 0) {
            const lastStatsIndex = userStats.stats.length - 1;
            const lastStatsRecord = userStats.stats[lastStatsIndex];
            const lastWeightRecord = lastStatsRecord.weight;
            const isDeclaredAlready = userStats.stats.find((stat) => new Date(stat.date).getDay() === new Date(date).getDay());
            if (isDeclaredAlready) {
                res.status(403).send('You already declared your progress at this day');
                return;
            }
            const { failureMessages, goalsAchieved, calculatedGrade } = (0, statsHelpers_1.calculateGrade)(lastWeightRecord, fatPercentage, lastStatsRecord, musclesMass, userGoals.basicGoal, userGoals.detailGoals, weight, messages);
            grade += calculatedGrade;
            messages = [...failureMessages];
            accomplishments = { ...goalsAchieved };
        }
        const newStatsEntry = {
            date,
            deservedGrade: grade,
            weight,
            height,
            fatPercentage,
            musclesMass,
            bodyImageUrl,
        };
        user.grade += grade;
        user.hasInitialStats = true;
        userStats.stats.push(newStatsEntry);
        await userStats.save();
        await user.save();
        res.status(201).json({ messages, grade, accomplishments });
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.addStats = addStats;
// export const createFakeStats: RequestHandler = async (req, res, next) => {
//   const data = [
//     { date: '10-25-2021', weight: 50, fatPercentage: 12, musclesMass: 45 },
//     { date: '10-26-2021', weight: 60, fatPercentage: 10, musclesMass: 46 },
//     { date: '10-27-2021', weight: 66, fatPercentage: 9, musclesMass: 47 },
//     { date: '10-28-2021', weight: 55, fatPercentage: 8, musclesMass: 50 },
//     { date: '10-29-2021', weight: 58, fatPercentage: 10, musclesMass: 46 },
//     { date: '10-30-2021', weight: 62, fatPercentage: 13, musclesMass: 48 },
//   ];
//   const { userId } = req;
//   const userStats = (await PhysicalStats.findOne({
//     user: userId,
//   })) as PhysicalStatsType;
//   data.forEach((item) => {
//     const date = new Date(new Date(item.date).setHours(0, 0, 0, 0));
//     const newStatsEntry = {
//       date: date,
//       deservedGrade: 15,
//       weight: item.weight,
//       fatPercentage: item.fatPercentage,
//       musclesMass: item.musclesMass,
//     };
//     userStats.stats.push(newStatsEntry);
//   });
//   await userStats.save();
//   res.end();
// };
const getAllStatsDates = async (req, res, next) => {
    try {
        const { userId } = req;
        const userStats = (await PhysicalStats_1.default.findOne({
            user: userId,
        }));
        if (!userStats) {
            res.status(403).send('No stats were found for this user');
            return;
        }
        if (userStats.stats.length === 0) {
            res.status(403).send('No stats were created yet');
            return;
        }
        const statsDates = userStats.stats.map((stats) => stats.date);
        res.status(200).json({ statsDates: [...statsDates] });
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.getAllStatsDates = getAllStatsDates;
const getStatsByDate = async (req, res, next) => {
    try {
        const { userId } = req;
        const { date } = req.params;
        (0, validationErrors_1.validationErrorsHandler)(req);
        const userStats = (await PhysicalStats_1.default.findOne({
            user: userId,
        }));
        if (!userStats) {
            res.status(403).send('No stats were found for this user');
            return;
        }
        const requestedStats = userStats.stats.find((stats) => stats.date.toString() === date);
        if (!requestedStats) {
            res.status(403).send('Invalid date, no stats were entered at this date');
            return;
        }
        res.status(200).json({ ...requestedStats });
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.getStatsByDate = getStatsByDate;
const getAllStats = async (req, res, next) => {
    try {
        const { userId } = req;
        const userStats = (await PhysicalStats_1.default.findOne({
            user: userId,
        }).populate('user'));
        if (!userStats) {
            res.status(403).send('No stats were found for this user');
            return;
        }
        const { age, rank, stats, user } = userStats;
        const { name } = user;
        if (userStats.stats.length === 0) {
            res.status(200).send({ age, rank, stats, name });
            return;
        }
        res.status(200).json({ age, rank, stats, name });
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.getAllStats = getAllStats;
const deleteLastStats = async (req, res, next) => {
    try {
        const { userId } = req;
        const userStats = (await PhysicalStats_1.default.findOne({
            user: userId,
        }));
        if (!userStats) {
            res.status(403).send('No stats were found for this user');
            return;
        }
        if (userStats.stats.length === 0) {
            res.status(403).send('No stats were created yet');
            return;
        }
        const lastStatsIndex = userStats.stats.length - 1;
        const lastStats = userStats.stats[lastStatsIndex];
        const currentTime = new Date().getTime();
        const lastStatsTime = Date.parse(lastStats.date.toString());
        const dayInMS = 100 * 60 * 60 * 24; //one day in ms
        const allowedToDelete = currentTime - lastStatsTime < dayInMS;
        if (!allowedToDelete) {
            res
                .status(403)
                .send("It's been over 24 hours since the last stats were created, You can't delete them");
            return;
        }
        userStats.stats.pop();
        await userStats.save();
        res.status(200).send('The last stats were deleted');
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.deleteLastStats = deleteLastStats;
const changeLastStats = async (req, res, next) => {
    try {
        const { userId } = req;
        const { weight, height, fatPercentage, musclesMass, bodyImageUrl } = req.body;
        (0, validationErrors_1.validationErrorsHandler)(req);
        const userStats = (await PhysicalStats_1.default.findOne({
            user: userId,
        }));
        if (!userStats) {
            res.status(403).send('No stats were found for this user');
            return;
        }
        if (userStats.stats.length === 0) {
            res.status(403).send('No stats were created yet');
            return;
        }
        const lastStatsIndex = userStats.stats.length - 1;
        const lastStats = userStats.stats[lastStatsIndex];
        const currentTime = new Date().getTime();
        const lastStatsTime = Date.parse(lastStats.date.toString());
        const dayInMS = 100 * 60 * 60 * 24; //one day in ms
        const allowedToChange = currentTime - lastStatsTime < dayInMS;
        if (!allowedToChange) {
            res
                .status(403)
                .send("It's been over 24 hours since the last stats were created, You can't change them");
            return;
        }
        const noData = !weight && !height && !fatPercentage && !musclesMass && !bodyImageUrl;
        if (noData) {
            res.status(403).send('No data was provided');
            return;
        }
        if (weight)
            lastStats.weight = weight;
        if (height)
            lastStats.height = height;
        if (fatPercentage)
            lastStats.fatPercentage = fatPercentage;
        if (musclesMass)
            lastStats.musclesMass = musclesMass;
        if (bodyImageUrl)
            lastStats.bodyImageUrl = bodyImageUrl;
        await userStats.save();
        res.status(200).send('The last stats were updated');
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.changeLastStats = changeLastStats;
const setRanking = async (req, res, next) => {
    try {
        const { userId } = req;
        const { selfRank } = req.body;
        (0, validationErrors_1.validationErrorsHandler)(req);
        const physicalStats = (await PhysicalStats_1.default.findOne({
            user: userId,
        }));
        if (!physicalStats) {
            res
                .status(403)
                .send("Something went wrong... Couldn't find stats that match the user");
            return;
        }
        physicalStats.rank = selfRank;
        await physicalStats.save();
        res.status(201).send('Ranking the user successfully');
        return;
    }
    catch (err) {
        (0, catchErrorsHandler_1.catchErrorHandler)(err, next);
    }
};
exports.setRanking = setRanking;
