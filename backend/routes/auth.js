const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controller/auth");

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
      "password be atleast 6 characters"
    )
      .isLength({ min: 6 })
      .isAlphanumeric(), //isStrongPassword
    body("gender").custom((value) => {
      if (value === "male" || value === "female") {
        return true;
      }
      throw new Error("gender is invalid");
    }),
    body("dateOfBirth").custom((value) => {
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

module.exports = router;
