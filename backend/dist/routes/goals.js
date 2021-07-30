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
router.post("/", authMiddleware_1.default, [
    express_validator_1.body("basicGoal").custom((value) => {
        if (value === "lose weight" || value === "gain weight") {
            return true;
        }
        throw new Error("basic goal can be either 'lose weight' or 'gain weight'");
    }),
    express_validator_1.body("weight", "Weight must be a number").isFloat(),
    express_validator_1.body("fatPercentage", "Fat percentage must be a number")
        .optional()
        .isFloat(),
    express_validator_1.body("muscelesMass", "Musceles mass must be a number").optional().isFloat(),
], goalsController.createGoal);
exports.default = router;
