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
const programExecutionController = __importStar(require("../controller/programExecution"));
const customValidationHelpers_1 = require("../utils/helpers/validation/customValidationHelpers");
const router = express_1.default.Router();
router.get('/exercises-to-do/:date?', authMiddleware_1.default, (0, express_validator_1.param)('date', 'The parameter that provided is not a valid date')
    .optional()
    .isDate({ format: 'MM-DD-YYYY' }), programExecutionController.getExercisesByDate);
// router.post(
//   '/dummydata',
//   authMiddleware,
//   programExecutionController.createDummyData
// );
router.post('/:date?', authMiddleware_1.default, [
    (0, express_validator_1.param)('date', 'The parameter that provided is not a valid date')
        .optional()
        .isDate({ format: 'MM-DD-YYYY' }),
    (0, express_validator_1.body)('exercises', 'Each exercise need to have a boolean value')
        .optional()
        .custom((value) => {
        for (let key in value) {
            if (typeof value[key] === 'boolean') {
                continue;
            }
            return false;
        }
        return true;
    }),
], programExecutionController.declareAnExecution);
router.get('/:date', authMiddleware_1.default, [(0, express_validator_1.param)('date', 'This date is invalid').isDate({ format: 'MM-DD-YYYY' })], programExecutionController.getSingleExecution);
router.get('/by-range/:range/:date', authMiddleware_1.default, [
    (0, express_validator_1.param)('range', 'a range can only be a week, a month, a year or all').custom((value) => (0, customValidationHelpers_1.validateEnums)(value, ['week', 'month', 'year', 'all'])),
    (0, express_validator_1.param)('date', 'date is invalid').isDate({ format: 'MM-DD-YYYY' }),
], programExecutionController.getExecutionsByRange);
exports.default = router;
