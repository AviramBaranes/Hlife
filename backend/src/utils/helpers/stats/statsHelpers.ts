import { DetailGoalType } from "../../../models/Goals";
import { StatsObjType } from "../../../models/PhysicalStats";

export interface GoalsAchieved {
  fatPercentage: boolean;
  musclesMass: boolean;
  weight: boolean;
}

let goalsAchieved = <GoalsAchieved>{};

export const calculateGrade = (
  lastWeightRecord: number,
  fatPercentage: number,
  lastStatsRecord: StatsObjType,
  musclesMass: number,
  basicGoals: string,
  detailedGoals: DetailGoalType,
  weight: number,
  failureMessages: string[]
) => {
  let calculatedGrade = 0;

  const fatPercentageImproved = fatPercentage < lastStatsRecord.fatPercentage!;
  const fatPercentageReachGoal = fatPercentage <= detailedGoals.fatPercentage!;

  const musclesMassImproved = musclesMass > lastStatsRecord.musclesMass!;
  const musclesMassReachGoal = musclesMass >= detailedGoals.musclesMass!;

  const loseFatGoal = basicGoals === "lose fat";
  const WeightDecrease = lastWeightRecord > weight;
  const loseWeightGoalAchieved = weight <= detailedGoals.weight!;
  const gainWeightGoalAchieved = weight >= detailedGoals.weight!;

  //FatPercentage
  if (fatPercentageImproved) {
    calculatedGrade += 5;
    if (fatPercentageReachGoal) {
      calculatedGrade += 5;
      goalsAchieved.fatPercentage = true;
    }
  } else {
    failureMessages.push(
      "Unfortunately you didn't reduced your fat percentage this time"
    );
  }

  //MusclesMass
  if (musclesMassImproved) {
    calculatedGrade += 5;
    if (musclesMassReachGoal) {
      calculatedGrade += 5;
      goalsAchieved.musclesMass = true;
    }
  } else {
    failureMessages.push(
      "Unfortunately you didn't gain more muscles mass this time"
    );
  }

  //Weight
  if (loseFatGoal) {
    if (WeightDecrease) {
      calculatedGrade += 5;
      if (loseWeightGoalAchieved) {
        calculatedGrade += 5;
        goalsAchieved.weight = true;
      }
    } else {
      failureMessages.push("You failed to lose weight");
    }
  } else {
    if (!WeightDecrease) {
      calculatedGrade += 5;
      if (gainWeightGoalAchieved) {
        calculatedGrade += 5;
        goalsAchieved.weight = true;
      }
    } else {
      failureMessages.push("You failed to lose weight");
    }
  }

  return { failureMessages, calculatedGrade, goalsAchieved };
};
