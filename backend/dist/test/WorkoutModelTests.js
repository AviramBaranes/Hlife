"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Workout_1 = __importDefault(require("../models/Workout"));
const User_1 = __importDefault(require("../models/User"));
describe('ProgramExecution model tests', () => {
    it('should be invalid if required fields are empty', () => {
        const workout = new Workout_1.default({ exercises: [{}] });
        workout.validate((err) => {
            (0, chai_1.expect)(err.errors.user.properties.message).equal('Path `user` is required.');
            (0, chai_1.expect)(err.errors.trainingDayName.properties.message).equal('Path `trainingDayName` is required.');
            (0, chai_1.expect)(err.errors.name.properties.message).equal('Path `name` is required.');
            (0, chai_1.expect)(err.errors['exercises.0.name'].properties.message).equal('Path `name` is required.');
            (0, chai_1.expect)(err.errors['exercises.0.sets'].properties.message).equal('Path `sets` is required.');
            (0, chai_1.expect)(err.errors['exercises.0.reps'].properties.message).equal('Path `reps` is required.');
        });
    });
    it('should be invalid if fields are not correct ', () => {
        const workoutFields = {
            user: '-',
            trainingDayName: '-',
            name: '-',
            exercises: [{ sets: 0, reps: 0 }],
            time: 0,
        };
        const workout = new Workout_1.default(workoutFields);
        workout.validate((err) => {
            (0, chai_1.expect)(err.errors.user.reason.message).equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
            (0, chai_1.expect)(err.errors.trainingDayName.properties.message).equal('`-` is not a valid enum value for path `trainingDayName`.');
            (0, chai_1.expect)(err.errors['exercises.0.sets'].properties.message).equal('Path `sets` (0) is less than minimum allowed value (1).');
            (0, chai_1.expect)(err.errors['exercises.0.reps'].properties.message).equal('Path `reps` (0) is less than minimum allowed value (1).');
        });
    });
    it('should be a valid model with defaults', () => {
        const userFields = {
            name: '-',
            username: '-',
            email: '-',
            password: '-',
            gender: 'male',
            dateOfBirth: '01/01/2005',
        };
        const user = new User_1.default(userFields);
        const workoutFields = {
            user: user._id,
            trainingDayName: 'A',
            name: '-',
            exercises: [],
        };
        const workout = new Workout_1.default(workoutFields);
        workout.validate((err) => {
            (0, chai_1.expect)(err).equal(null);
        });
    });
});
