import express from "express";
import { body, param } from "express-validator";

import * as authController from "../controller/auth";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

//sugnup
router.post(
  "/signup",
  [
    body("name", "name only allow letters, and must be atleast 3 characters")
      .isAlpha()
      .isLength({ min: 3 }),
    body("username", "username must be atleast 3 characters")
      .isLength({ min: 3 })
      .isAlphanumeric(),
    body("email", "please enter a correct emil").isEmail().normalizeEmail(),
    body(
      ["password", "passwordConfirmation"],
      "password need to be atleast 6 characters"
    )
      .isLength({ min: 6 })
      .isAlphanumeric(), //isStrongPassword
    body("gender").custom((value: string) => {
      if (value === "male" || value === "female") {
        return true;
      }
      throw new Error("gender is invalid");
    }),
    body("dateOfBirth").custom((value: string) => {
      const limit = new Date("01/01/1920");
      const max = new Date("01/01/2005");
      const date = new Date(value);

      if (date + "test" === "Invalid Datetest") {
        throw new Error("invalid Date");
      }

      if (date.getTime() < limit.getTime() || date.getTime() > max.getTime()) {
        throw new Error(
          "Date must be in range between 01/01/1920 and 01/01/2005"
        );
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
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
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
    .withMessage("Invalid password, At least 6 characters for a password"),
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
    .withMessage("Invalid password, At least 6 characters for a password"),
  authController.resetPasswordViaToken
);

//validate token
router.get(
  "/reset/validate-token/:token",
  param("resetToken")
    .isLength({ min: 64, max: 64 })
    .withMessage("Invalid Token, too short"),
  authController.validateResetToken
);

//validate auth
router.get("/isUser", authMiddleware, authController.validateUser);

export default router;
