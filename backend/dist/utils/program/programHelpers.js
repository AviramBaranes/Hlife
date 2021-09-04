"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMaleRecommendationProgram = exports.calculateFemaleRecommendationProgram = exports.validateExercises = void 0;
const musclesList = [
    "Traps",
    "Shoulders",
    "Chest",
    "Upper back",
    "Lats",
    "Lower back",
    "Triceps",
    "Biceps",
    "Forearm",
    "Abs",
    "Gluteus",
    "Quads",
    "Hamstrings",
    "Claves", //תאומים
];
const validateExercises = (exercises) => {
    let isValid = true;
    exercises.forEach((exercise) => {
        if (exercise.muscles) {
            exercise.muscles.forEach((enteredMuscle) => {
                const isMuscleValid = musclesList.find((muscle) => muscle === enteredMuscle);
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
exports.validateExercises = validateExercises;
const calculateFemaleRecommendationProgram = (basicGoal, rank) => {
    if (basicGoal === "increase muscles mass") {
        if (rank === "Pro") {
            return [{ workoutName: "AB", timesPerWeek: 4 }];
        }
        else {
            let timesPerWeek;
            switch (rank) {
                case "Beginner":
                    timesPerWeek = 1;
                    break;
                case "Intermediate":
                    timesPerWeek = 2;
                    break;
                case "Advanced":
                    timesPerWeek = 3;
                    break;
                default:
                    timesPerWeek = 1;
            }
            return [{ workoutName: "FB", timesPerWeek }];
        }
    }
    if (basicGoal === "lose fat") {
        if (rank === "Pro") {
            return [
                { workoutName: "aerobic", timesPerWeek: 4 },
                { workoutName: "FB", timesPerWeek: 1 },
            ];
        }
        else {
            let timesPerWeek;
            switch (rank) {
                case "Beginner":
                    timesPerWeek = 2;
                    break;
                case "Intermediate":
                    timesPerWeek = 3;
                    break;
                case "Advanced":
                    timesPerWeek = 4;
                    break;
                default:
                    timesPerWeek = 1;
            }
            return [{ workoutName: "aerobic", timesPerWeek }];
        }
    }
    return [{ workoutName: "", timesPerWeek: 0 }];
};
exports.calculateFemaleRecommendationProgram = calculateFemaleRecommendationProgram;
const calculateMaleRecommendationProgram = (basicGoal, rank) => {
    if (basicGoal === "increase muscles mass") {
        switch (rank) {
            case "Beginner":
                return [{ workoutName: "FB", timesPerWeek: 3 }];
            case "Intermediate":
                return [{ workoutName: "AB", timesPerWeek: 4 }];
            case "Advanced":
                return [{ workoutName: "ABC", timesPerWeek: 6 }];
            case "Pro":
                return [{ workoutName: "ABCD", timesPerWeek: 6 }];
        }
    }
    if (basicGoal === "lose fat") {
        if (rank === "Pro") {
            return [
                { workoutName: "aerobic", timesPerWeek: 4 },
                { workoutName: "FB", timesPerWeek: 1 },
            ];
        }
        else {
            let timesPerWeek;
            switch (rank) {
                case "Beginner":
                    timesPerWeek = 2;
                    break;
                case "Intermediate":
                    timesPerWeek = 3;
                    break;
                case "Advanced":
                    timesPerWeek = 4;
                    break;
                default:
                    timesPerWeek = 1;
            }
            return [{ workoutName: "aerobic", timesPerWeek }];
        }
    }
    return [{ workoutName: "", timesPerWeek: 0 }];
};
exports.calculateMaleRecommendationProgram = calculateMaleRecommendationProgram;
