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
const goalsController = __importStar(require("../controller/goals"));
const router = express_1.default.Router();
//create goals
router.post("/", authMiddleware_1.default, [
    (0, express_validator_1.body)("basicGoal", "basic goal can be either 'lose fat' or 'increase muscles mass'").custom((value) => {
        if (value === "lose fat" || value === "increase muscles mass") {
            return true;
        }
        return false;
    }),
    (0, express_validator_1.body)("weight", "Weight must be a number").isFloat({ min: 30, max: 225 }),
    (0, express_validator_1.body)("fatPercentage", "Fat percentage must be a number")
        .optional()
        .isFloat({ min: 0, max: 50 }),
    (0, express_validator_1.body)("musclesMass", "Muscles mass must be a number")
        .optional()
        .isFloat({ min: 25, max: 125 }),
], goalsController.createGoal);
//change basic goal
router.put("/basicGoal", authMiddleware_1.default, [
    (0, express_validator_1.body)("fatPercentage", "Fat percentage must be a number")
        .optional()
        .isFloat({ min: 0, max: 50 }),
    (0, express_validator_1.body)("musclesMass", "Muscles mass must be a number")
        .optional()
        .isFloat({ min: 25, max: 100 }),
], goalsController.changeBasicGoal);
//change detail goal
router.put("/", authMiddleware_1.default, [
    (0, express_validator_1.body)("weight", "Weight must be a number")
        .optional()
        .isFloat({ min: 30, max: 225 }),
    (0, express_validator_1.body)("fatPercentage", "Fat percentage must be a number")
        .optional()
        .isFloat({ min: 0, max: 50 }),
    (0, express_validator_1.body)("musclesMass", "Muscles mass must be a number")
        .optional()
        .isFloat({ min: 25, max: 100 }),
], goalsController.changeGoals);
//get goals
router.get("/", authMiddleware_1.default, goalsController.getGoals);
exports.default = router;
