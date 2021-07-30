"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGrade = void 0;
let goalsAchieved = {};
const calculateGrade = (lastWeightRecord, fatPercentage, lastStatsRecord, muscelesMass, basicGoals, detailedGoals, weight, failureMessages) => {
    let calculatedGrade = 0;
    const fatPercentageImproved = fatPercentage < lastStatsRecord.fatPercentage;
    const fatPercentageReachGoal = fatPercentage <= detailedGoals.fatPercentage;
    const muscelesMassImproved = muscelesMass > lastStatsRecord.muscelesMass;
    const muscelesMassReachGoal = muscelesMass >= detailedGoals.muscelesMass;
    const loseWeightGoal = basicGoals === "lose weight";
    const WeightDecrease = lastWeightRecord > weight;
    const loseWeightGoalAchieved = weight <= detailedGoals.weight;
    const gainWeightGoalAchieved = weight >= detailedGoals.weight;
    //FatPercentage
    if (fatPercentageImproved) {
        calculatedGrade += 5;
        if (fatPercentageReachGoal) {
            calculatedGrade += 5;
            goalsAchieved.fatPercentage = true;
        }
    }
    else {
        failureMessages.push("Unfortunately you didn't reduced your fat percentage this time");
    }
    //MuscelesMass
    if (muscelesMassImproved) {
        calculatedGrade += 5;
        if (muscelesMassReachGoal) {
            calculatedGrade += 5;
            goalsAchieved.muscelesMass = true;
        }
    }
    else {
        failureMessages.push("Unfortunately you didn't gain more musceles mass this time");
    }
    //Weight
    if (loseWeightGoal) {
        if (WeightDecrease) {
            calculatedGrade += 5;
            if (loseWeightGoalAchieved) {
                calculatedGrade += 5;
                goalsAchieved.weight = true;
            }
        }
        else {
            failureMessages.push("You failed to lose weight");
        }
    }
    else {
        if (!WeightDecrease) {
            calculatedGrade += 5;
            if (gainWeightGoalAchieved) {
                calculatedGrade += 5;
                goalsAchieved.weight = true;
            }
        }
        else {
            failureMessages.push("You failed to lose weight");
        }
    }
    return { failureMessages, calculatedGrade, goalsAchieved };
};
exports.calculateGrade = calculateGrade;
