export interface ExercisesObj {
  name: string;
  sets: number;
  reps: number;
  muscles?: string[];
  description?: string;
}

const musclesList = [
  'Traps',
  'Shoulders',
  'Chest',
  'Upper back',
  'Lats', //כנפיים
  'Lower back',
  'Triceps',
  'Biceps',
  'Forearm',
  'Abs',
  'Gluteus', //עכוז
  'Quads', //ארבעראשי
  'Hamstrings',
  'Claves', //תאומים
];

type BasicGoal = 'lose fat' | 'increase muscles mass';
type Rank = 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';

export const validateExercises = (exercises: ExercisesObj[]) => {
  let isValid = true;

  exercises.forEach((exercise) => {
    if (exercise.muscles) {
      exercise.muscles.forEach((enteredMuscle) => {
        const isMuscleValid = musclesList.find(
          (muscle) => muscle === enteredMuscle
        );
        if (!isMuscleValid) {
          isValid = false;
          return;
        }
      });
    }

    const isSetsInt = Number.isInteger(exercise.sets);
    const isRepsInt = Number.isInteger(exercise.reps);
    const isSetsInRange = exercise.sets < 1 || exercise.sets > 7;
    const isRepsInRange = exercise.reps < 1 || exercise.reps > 50;

    if (!isSetsInt) {
      isValid = false;
    }
    if (!isRepsInt) {
      isValid = false;
    }

    if (isSetsInRange) {
      isValid = false;
    }
    if (isRepsInRange) {
      isValid = false;
    }
  });

  return isValid;
};

export const calculateFemaleRecommendationProgram = (
  basicGoal: BasicGoal,
  rank: Rank
): { workoutName: string; timesPerWeek: number }[] => {
  if (basicGoal === 'increase muscles mass') {
    if (rank === 'Pro') {
      return [{ workoutName: 'AB', timesPerWeek: 4 }];
    } else {
      let timesPerWeek: number;
      switch (rank) {
        case 'Beginner':
          timesPerWeek = 1;
          break;
        case 'Intermediate':
          timesPerWeek = 2;
          break;
        case 'Advanced':
          timesPerWeek = 3;
          break;
        default:
          timesPerWeek = 1;
      }
      return [{ workoutName: 'FB', timesPerWeek }];
    }
  }

  if (basicGoal === 'lose fat') {
    if (rank === 'Pro') {
      return [
        { workoutName: 'aerobic', timesPerWeek: 4 },
        { workoutName: 'FB', timesPerWeek: 1 },
      ];
    } else {
      let timesPerWeek: number;
      switch (rank) {
        case 'Beginner':
          timesPerWeek = 2;
          break;
        case 'Intermediate':
          timesPerWeek = 3;
          break;
        case 'Advanced':
          timesPerWeek = 4;
          break;
        default:
          timesPerWeek = 1;
      }
      return [{ workoutName: 'aerobic', timesPerWeek }];
    }
  }
  return [{ workoutName: '', timesPerWeek: 0 }];
};

export const calculateMaleRecommendationProgram = (
  basicGoal: BasicGoal,
  rank: Rank
): { workoutName: string; timesPerWeek: number }[] => {
  if (basicGoal === 'increase muscles mass') {
    switch (rank) {
      case 'Beginner':
        return [{ workoutName: 'FB', timesPerWeek: 3 }];
      case 'Intermediate':
        return [{ workoutName: 'AB', timesPerWeek: 4 }];
      case 'Advanced':
        return [{ workoutName: 'ABC', timesPerWeek: 5 }];
      case 'Pro':
        return [{ workoutName: 'ABCD', timesPerWeek: 4 }];
    }
  }

  if (basicGoal === 'lose fat') {
    if (rank === 'Pro') {
      return [
        { workoutName: 'aerobic', timesPerWeek: 4 },
        { workoutName: 'FB', timesPerWeek: 1 },
      ];
    } else {
      let timesPerWeek: number;
      switch (rank) {
        case 'Beginner':
          timesPerWeek = 2;
          break;
        case 'Intermediate':
          timesPerWeek = 3;
          break;
        case 'Advanced':
          timesPerWeek = 4;
          break;
        default:
          timesPerWeek = 1;
      }
      return [{ workoutName: 'aerobic', timesPerWeek }];
    }
  }
  return [{ workoutName: '', timesPerWeek: 0 }];
};
