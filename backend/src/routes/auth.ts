import express from "express";
import { body, param } from "express-validator";

import * as authController from "../controller/auth";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

//signup
router.post(
  "/signup",
  [
    body("name")
      .isAlpha()
      .withMessage("name only allow letters")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters"),

    body("username")
      .isLength({ min: 3 })
      .withMessage("username must be at least 3 characters")
      .isAlphanumeric()
      .withMessage("username only allow letters and numbers"),

    body("email", "please enter a correct email").isEmail().normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("password need to be at least 6 characters")
      .isAlphanumeric()
      .withMessage("password only allow letters and numbers"), //isStrongPassword

    body("passwordConfirmation")
      .isLength({ min: 6 })
      .withMessage("password need to be at least 6 characters")
      .isAlphanumeric()
      .withMessage("password only allow letters and numbers"),

    body("gender", "gender is invalid").custom((value: string) => {
      if (value === "male" || value === "female") {
        return true;
      }
      return false;
    }),

    body(
      "dateOfBirth",
      'The field must be a date between "01/01/1920" and "01/01/2005"'
    )
      .isDate()
      .custom((value: string) => {
        const limit = new Date("01/01/1920");
        const max = new Date("01/01/2005");
        const date = new Date(value);

        if (
          date.getTime() < limit.getTime() ||
          date.getTime() > max.getTime()
        ) {
          return false;
        }

        return true;
      }),
  ],
  authController.signup
);

//login
router.post(
  "/login",
  [
    body("email", "please enter a correct email").isEmail().normalizeEmail(),

    body(
      "password",
      "Invalid password, At least 6 characters for a password"
    ).isLength({ min: 6 }),
  ],
  authController.login
);

//logout
router.post("/logout", authMiddleware, authController.logout);

//reset via settings
router.post(
  "/settings/password-reset",
  authMiddleware,
  body(["currentPassword", "newPassword", "newPasswordConfirmation"])
    .isLength({ min: 6 })
    .withMessage("password need to be at least 6 characters")
    .isAlphanumeric()
    .withMessage("password only allow letters and numbers"),
  authController.resetPassword
);

//send email reset token
router.post(
  "/password/send-token",
  body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
  authController.sendResetEmail
);

//reset via email
router.put(
  "/reset/password-reset",
  body(["password", "passwordConfirmation"])
    .isLength({ min: 6 })
    .withMessage("password need to be at least 6 characters")
    .isAlphanumeric()
    .withMessage("password only allow letters and numbers"),
  authController.resetPasswordViaToken
);

//validate token
router.get(
  "/reset/validate-token/:token",
  param("token")
    .isLength({ min: 64, max: 64 })
    .withMessage("Invalid Token, too short"),
  authController.validateResetToken
);

//validate auth
router.get("/isUser", authMiddleware, authController.validateUser);

export default router;
