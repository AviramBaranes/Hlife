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

let failureMessages: string[] = [];
let goalsAchieved = <GoalsAchieved>{};

export const calculateGrade = (
  lastWeightRecord: number,
  fatPercentage: number,
  lastStatsRecord: GoalsAndStatsObj,
  muscelesMass: number,
  basicGoals: string,
  detailedGoals: GoalsAndStatsObj,
  weight: number
) => {
  let calculatedGrade = 0;

  if (fatPercentage < lastStatsRecord.fatPercentage) {
    calculatedGrade += 5;
    if (fatPercentage < detailedGoals.fatPercentage) {
      calculatedGrade += 5;
      goalsAchieved.fatPercentage = true;
    }
  } else {
    failureMessages.push(
      "Unfortunately you didn't reduced your fat percentage this time"
    );
  }

  if (muscelesMass > lastStatsRecord.muscelesMass) {
    calculatedGrade += 5;
    if (muscelesMass > detailedGoals.muscelesMass) {
      calculatedGrade += 5;
      goalsAchieved.muscelesMass = true;
    }
  } else {
    failureMessages.push(
      "Unfortunately you didn't gain more musceles mass this time"
    );
  }

  switch (basicGoals) {
    case "lose weight":
      calculatedGrade += calcWeightChangeGrade(
        lastWeightRecord,
        weight,
        "lose"
      );
      break;
    case "gain weight":
      calculatedGrade += calcWeightChangeGrade(
        weight,
        lastWeightRecord,
        "gain"
      );
      break;
  }

  return { failureMessages, calculatedGrade, goalsAchieved };
};

const calcWeightChangeGrade = (
  weight1: number,
  weight2: number,
  messageVerb: string
) => {
  if (weight1 > weight2) {
    goalsAchieved.weight = true;
    return 5;
  }
  failureMessages.push(`You failed to ${messageVerb} weight`);
  return 0;
};
