export interface ExercisesObj {
  name: string;
  sets: number;
  reps: number;
  muscles?: string[];
  description?: string;
}

const musclesList = [
  "Traps",
  "Shoulders",
  "Chest",
  "Upper back",
  "Lats", //כנפיים
  "Lower back",
  "Triceps",
  "Biceps",
  "Forearm",
  "Abs",
  "Gluteus", //עכוז
  "Quads", //ארבעראשי
  "Hamstrings",
  "Claves", //תאומים
];

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

  if (isValid) return true;
  throw new Error("Invalid data");
};
