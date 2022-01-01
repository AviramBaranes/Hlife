"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const PhysicalStats_1 = __importDefault(require("../models/PhysicalStats"));
const User_1 = __importDefault(require("../models/User"));
describe('PhysicalStats model tests', () => {
    it('should be invalid if required fields are empty', () => {
        const stats = new PhysicalStats_1.default({});
        stats.validate((err) => {
            (0, chai_1.expect)(err.errors.user.properties.message).equal('Path `user` is required.');
            (0, chai_1.expect)(err.errors.age.properties.message).equal('Path `age` is required.');
        });
    });
    it('should be invalid if fields are not correct', () => {
        const statsFields = {
            user: '-',
            age: 111,
            rank: '-',
            stats: [{ height: 50 }],
        };
        const stats = new PhysicalStats_1.default(statsFields);
        stats.validate((err) => {
            (0, chai_1.expect)(err.errors.user.reason.message).equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
            (0, chai_1.expect)(err.errors.age.properties.message).equal('Path `age` (111) is more than maximum allowed value (100).');
            (0, chai_1.expect)(err.errors.rank.properties.message).equal('`-` is not a valid enum value for path `rank`.');
            (0, chai_1.expect)(err.errors['stats.0.deservedGrade'].properties.message).equal('Path `deservedGrade` is required.');
            (0, chai_1.expect)(err.errors['stats.0.weight'].properties.message).equal('Path `weight` is required.');
            (0, chai_1.expect)(err.errors['stats.0.date'].properties.message).equal('Path `date` is required.');
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
        const statsFields = {
            user: user._id,
            age: 99,
            stats: [{ date: new Date(), weight: 50, deservedGrade: 20 }],
        };
        const stats = new PhysicalStats_1.default(statsFields);
        stats.validate((err) => {
            (0, chai_1.expect)(err).equal(null);
        });
    });
});
