"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const workoutController = __importStar(require("../controller/workout"));
const customValidationHelpers_1 = require("../utils/helpers/validation/customValidationHelpers");
const programHelpers_1 = require("../utils/program/programHelpers");
const router = express_1.default.Router();
const trainingDayNames = ["A", "B", "C", "D", "FB", "aerobic"];
router.post("/", authMiddleware_1.default, [
    express_validator_1.body("trainingDayName", "Invalid training day name").custom((value) => customValidationHelpers_1.validateEnums(value, trainingDayNames)),
    express_validator_1.body("name")
        .isAlpha()
        .withMessage("Name can contain only letters")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 letters"),
    express_validator_1.body("description", "Description too short")
        .optional()
        .isLength({ min: 10 }),
    express_validator_1.body("exercises", "Exercises are invalid").custom((value) => programHelpers_1.validateExercises(value)),
    express_validator_1.body("time", "Time is invalid").optional().isInt({ min: 10, max: 300 }),
], workoutController.createWorkout);
//get by name
router.get("/", authMiddleware_1.default, express_validator_1.query("trainingDayName", "Invalid training day name").custom((value) => customValidationHelpers_1.validateEnums(value, trainingDayNames)), workoutController.getWorkoutByName);
//get by id
router.get("/:workoutId", authMiddleware_1.default, workoutController.getById);
router.put("/", authMiddleware_1.default, [
    express_validator_1.body("trainingDayName", "Invalid training day name").custom((value) => customValidationHelpers_1.validateEnums(value, trainingDayNames)),
    express_validator_1.body("name")
        .isAlpha()
        .withMessage("Name can contain only letters")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 letters"),
    express_validator_1.body("description", "Description too short")
        .optional()
        .isLength({ min: 10 }),
    express_validator_1.body("exercises", "Exercises are invalid").custom((value) => programHelpers_1.validateExercises(value)),
    express_validator_1.body("time", "Time is invalid").optional().isInt({ min: 10, max: 300 }),
], workoutController.changeWorkout);
router.delete("/:trainingDayName", authMiddleware_1.default, express_validator_1.param("trainingDayName", "Invalid training day name").custom((value) => customValidationHelpers_1.validateEnums(value, trainingDayNames)), workoutController.deleteWorkout);
exports.default = router;
