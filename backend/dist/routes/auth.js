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
const authController = __importStar(require("../controller/auth"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
//signup
router.post('/signup', [
    (0, express_validator_1.body)('name')
        .isAlpha()
        .withMessage('name only allow letters')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    (0, express_validator_1.body)('email', 'please enter a correct email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('password need to be at least 6 characters')
        .isAlphanumeric()
        .withMessage('password only allow letters and numbers'),
    (0, express_validator_1.body)('passwordConfirmation')
        .isLength({ min: 6 })
        .withMessage('password need to be at least 6 characters')
        .isAlphanumeric()
        .withMessage('password only allow letters and numbers'),
    (0, express_validator_1.body)('gender', 'gender is invalid').custom((value) => {
        if (value === 'male' || value === 'female') {
            return true;
        }
        return false;
    }),
    (0, express_validator_1.body)('dateOfBirth', 'The field must be a date between "01/01/1920" and "01/01/2005"')
        .isDate()
        .custom((value) => {
        const limit = new Date('01/01/1920');
        const max = new Date('01/01/2005');
        const date = new Date(value);
        if (date.getTime() < limit.getTime() ||
            date.getTime() > max.getTime()) {
            return false;
        }
        return true;
    }),
], authController.signup);
//login
router.post('/login', [
    (0, express_validator_1.body)('email', 'please enter a correct email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password', 'Invalid password, At least 6 characters for a password').isLength({ min: 6 }),
], authController.login);
//logout
router.post('/logout', authMiddleware_1.default, authController.logout);
//reset via settings
router.post('/settings/password-reset', authMiddleware_1.default, (0, express_validator_1.body)(['currentPassword', 'newPassword', 'newPasswordConfirmation'])
    .isLength({ min: 6 })
    .withMessage('password need to be at least 6 characters')
    .isAlphanumeric()
    .withMessage('password only allow letters and numbers'), authController.resetPassword);
//send email reset token
router.post('/password/send-token', (0, express_validator_1.body)('email').isEmail().withMessage('Invalid Email').normalizeEmail(), authController.sendResetEmail);
//reset via email
router.put('/reset/password-reset', (0, express_validator_1.body)(['password', 'passwordConfirmation'])
    .isLength({ min: 6 })
    .withMessage('password need to be at least 6 characters')
    .isAlphanumeric()
    .withMessage('password only allow letters and numbers'), authController.resetPasswordViaToken);
//validate token
router.get('/reset/validate-token/:token', (0, express_validator_1.param)('token')
    .isLength({ min: 64, max: 64 })
    .withMessage('Invalid Token, too short'), authController.validateResetToken);
//validate auth
router.get('/isUser', authMiddleware_1.default, authController.validateUser);
exports.default = router;
