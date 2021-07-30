interface GoalsAndStatsObj {
  fatPercentage: number;
  muscelesMass: number;
  weight?: number;
}

export interface GoalsAchieved {
  fatPercentage: boolean;
  muscelesMass: boolean;
  weight: boolean;
}

let goalsAchieved = <GoalsAchieved>{};

export const calculateGrade = (
  lastWeightRecord: number,
  fatPercentage: number,
  lastStatsRecord: GoalsAndStatsObj,
  muscelesMass: number,
  basicGoals: string,
  detailedGoals: GoalsAndStatsObj,
  weight: number,
  failureMessages: string[]
) => {
  let calculatedGrade = 0;

  const fatPercentageImproved = fatPercentage < lastStatsRecord.fatPercentage;
  const fatPercentageReachGoal = fatPercentage <= detailedGoals.fatPercentage;

  const muscelesMassImproved = muscelesMass > lastStatsRecord.muscelesMass;
  const muscelesMassReachGoal = muscelesMass >= detailedGoals.muscelesMass;

  const loseWeightGoal = basicGoals === "lose weight";
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

  //MuscelesMass
  if (muscelesMassImproved) {
    calculatedGrade += 5;
    if (muscelesMassReachGoal) {
      calculatedGrade += 5;
      goalsAchieved.muscelesMass = true;
    }
  } else {
    failureMessages.push(
      "Unfortunately you didn't gain more musceles mass this time"
    );
  }

  //Weight
  if (loseWeightGoal) {
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
