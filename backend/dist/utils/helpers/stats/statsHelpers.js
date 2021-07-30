"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGrade = void 0;
let failureMessages = [];
let goalsAchieved = {};
const calculateGrade = (lastWeightRecord, fatPercentage, lastStatsRecord, muscelesMass, basicGoals, detailedGoals, weight) => {
    let calculatedGrade = 0;
    if (fatPercentage < lastStatsRecord.fatPercentage) {
        calculatedGrade += 5;
        if (fatPercentage < detailedGoals.fatPercentage) {
            calculatedGrade += 5;
            goalsAchieved.fatPercentage = true;
        }
    }
    else {
        failureMessages.push("Unfortunately you didn't reduced your fat percentage this time");
    }
    if (muscelesMass > lastStatsRecord.muscelesMass) {
        calculatedGrade += 5;
        if (muscelesMass > detailedGoals.muscelesMass) {
            calculatedGrade += 5;
            goalsAchieved.muscelesMass = true;
        }
    }
    else {
        failureMessages.push("Unfortunately you didn't gain more musceles mass this time");
    }
    switch (basicGoals) {
        case "lose weight":
            calculatedGrade += calcWeightChangeGrade(lastWeightRecord, weight, "lose");
            break;
        case "gain weight":
            calculatedGrade += calcWeightChangeGrade(weight, lastWeightRecord, "gain");
            break;
    }
    return { failureMessages, calculatedGrade, goalsAchieved };
};
exports.calculateGrade = calculateGrade;
const calcWeightChangeGrade = (weight1, weight2, messageVerb) => {
    if (weight1 > weight2) {
        goalsAchieved.weight = true;
        return 5;
    }
    failureMessages.push(`You failed to ${messageVerb} weight`);
    return 0;
};
