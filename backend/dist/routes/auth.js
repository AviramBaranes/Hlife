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
//sugnup
router.post("/signup", [
    express_validator_1.body("name", "name only allow letters, and must be atleast 3 characters")
        .isAlpha()
        .isLength({ min: 3 }),
    express_validator_1.body("username", "username must be atleast 3 characters")
        .isLength({ min: 3 })
        .isAlphanumeric(),
    express_validator_1.body("email", "please enter a correct emil").isEmail().normalizeEmail(),
    express_validator_1.body(["password", "passwordConfirmation"], "password need to be atleast 6 characters")
        .isLength({ min: 6 })
        .isAlphanumeric(),
    express_validator_1.body("gender").custom((value) => {
        if (value === "male" || value === "female") {
            return true;
        }
        throw new Error("gender is invalid");
    }),
    express_validator_1.body("dateOfBirth").custom((value) => {
        const limit = new Date("01/01/1920");
        const max = new Date("01/01/2005");
        const date = new Date(value);
        if (date + "test" === "Invalid Datetest") {
            throw new Error("invalid Date");
        }
        if (date.getTime() < limit.getTime() || date.getTime() > max.getTime()) {
            throw new Error("Date must be in range between 01/01/1920 and 01/01/2005");
        }
        return true;
    }),
], authController.signup);
//login
router.post("/login", [
    express_validator_1.body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    express_validator_1.body("password", "Invalid password, At least 6 characters for a password").isLength({ min: 6 }),
], authController.login);
//logout
router.post("/logout", authMiddleware_1.default, authController.logout);
//reset via settings
router.post("/settings/password-reset", authMiddleware_1.default, express_validator_1.body(["currentPassword", "newPassword", "newPasswordConfirmation"])
    .isLength({ min: 6 })
    .withMessage("Invalid password, At least 6 characters for a password"), authController.resetPassword);
//send email reset token
router.post("/password/send-token", express_validator_1.body("email").isEmail().withMessage("Invalid Email").normalizeEmail(), authController.sendResetEmail);
//reset via email
router.put("/reset/password-reset", express_validator_1.body(["password", "passwordConfirmation"])
    .isLength({ min: 6 })
    .withMessage("Invalid password, At least 6 characters for a password"), authController.resetPasswordViaToken);
//validate token
router.get("/reset/validate-token/:token", express_validator_1.param("resetToken")
    .isLength({ min: 64, max: 64 })
    .withMessage("Invalid Token, too short"), authController.validateResetToken);
//validate auth
router.get("/isUser", authMiddleware_1.default, authController.validateUser);
exports.default = router;
