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
const statsController = __importStar(require("../controller/stats"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
//add stat
router.post("/", authMiddleware_1.default, [
    express_validator_1.body("weight", "Weight needs to be in range 35kg-250kg").isFloat({
        min: 35,
        max: 250,
    }),
    express_validator_1.body("height", "Height needs to be in a range of 100cm-250cm")
        .optional()
        .isInt({
        min: 100,
        max: 250,
    }),
    express_validator_1.body("fatPercentage", "Fat Percentage needs to be lower than 80%")
        .optional()
        .isInt({
        min: 0,
        max: 80,
    }),
    express_validator_1.body("muscelesMass", "Musceles mass needs to be in a range of 10kg-200kg")
        .optional()
        .isInt({
        min: 0,
        max: 80,
    }),
    express_validator_1.body("bodyImageUrl", "Image is invalid").optional().isURL(),
], statsController.addStats);
router.get("/all-stats-dates", authMiddleware_1.default, statsController.getAllStatsDates);
router.get("/:date", authMiddleware_1.default, express_validator_1.param("date", "invalid param").isDate(), statsController.getStatsByDate);
router.get("/", authMiddleware_1.default, statsController.getAllStats);
router.put("/", authMiddleware_1.default, [
    express_validator_1.body("weight", "Weight needs to be in range 35kg-250kg")
        .optional()
        .isFloat({
        min: 35,
        max: 250,
    }),
    express_validator_1.body("height", "Height needs to be in a range of 100cm-250cm")
        .optional()
        .isInt({
        min: 100,
        max: 250,
    }),
    express_validator_1.body("fatPercentage", "Fat Percentage needs to be lower than 80%")
        .optional()
        .isInt({
        min: 0,
        max: 80,
    }),
    express_validator_1.body("muscelesMass", "Musceles mass needs to be in a range of 10kg-200kg")
        .optional()
        .isInt({
        min: 0,
        max: 80,
    }),
    express_validator_1.body("bodyImageUrl", "Image is invalid").optional().isURL(),
], statsController.changeLastStats);
router.delete("/", authMiddleware_1.default, statsController.deleteLastStats);
exports.default = router;
