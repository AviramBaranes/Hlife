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
const programController = __importStar(require("../controller/program"));
const customValidationHelpers_1 = require("../utils/helpers/validation/customValidationHelpers");
const router = express_1.default.Router();
const trainingDayNames = ["A", "B", "C", "D", "FB", "aerobic"];
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
router.get("/recommendation", authMiddleware_1.default, programController.getRecommendationProgram);
router.post("/:day", authMiddleware_1.default, [
    express_validator_1.param("day", "Invalid day").custom((value) => customValidationHelpers_1.validateEnums(value, days)),
    express_validator_1.body("trainingDayName", "Training day is invalid")
        .optional()
        .custom((value) => customValidationHelpers_1.validateEnums(value, trainingDayNames)),
], programController.createProgram);
router.get("/", authMiddleware_1.default, programController.getAllPrograms);
router.get("/:day", authMiddleware_1.default, express_validator_1.param("day", "Day is invalid").custom((value) => customValidationHelpers_1.validateEnums(value, days)), programController.getProgram);
router.put("/:day", authMiddleware_1.default, [
    express_validator_1.param("day", "Invalid day").custom((value) => customValidationHelpers_1.validateEnums(value, days)),
    express_validator_1.body("trainingDayName", "Training day is invalid")
        .optional()
        .custom((value) => customValidationHelpers_1.validateEnums(value, trainingDayNames)),
    express_validator_1.body("restDay", "rest day needs to be a boolean").isBoolean(),
], programController.changeProgram);
exports.default = router;
