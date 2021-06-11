const User = require("../models/User");
const PhysicalStats = require("../models/PhysicalStats");
const Diet = require("../models/Diet");
const DietExecution = require("../models/DietExecution");
const Program = require("../models/Program");
const ProgramExecution = require("../models/ProgramExecution");

const expressValidator = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation Failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const {
      name,
      username,
      email,
      password,
      passwordConfirmation,
      gender,
      dateOfBirth,
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).send("user already exist with this email!");
    }

    if (password !== passwordConfirmation) {
      return res.status(401).send("passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      grade: 0,
    });

    const savedUser = await newUser.save();

    //age of the user:
    const now = new Date(Date.now());
    const birth = new Date(newUser.dateOfBirth);
    const age = now.getFullYear() - birth.getFullYear();

    const UserPhysicalStats = new PhysicalStats({
      user: savedUser._id,
      age,
      stats: [],
    });

    const UserDiet = new Diet({ user: savedUser._id, ingredients: [] });
    const UserProgram = new Program({
      user: savedUser._id,
      goals: {},
      program: [],
    });

    const UserProgramExecution = new ProgramExecution({
      user: savedUser._id,
      executions: [],
    });

    const UserDietSaved = await UserDiet.save();
    await UserPhysicalStats.save();
    await UserProgram.save();
    await UserProgramExecution.save();

    const UserDietExecution = new DietExecution({
      user: savedUser._id,
      diet: UserDietSaved._id,
      executions: [],
    });

    await UserDietExecution.save();

    const payload = { userId: savedUser._id.toString() };
    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "2h" });
    console.log("DONE");
    res
      .status(200)
      .cookie("jon", token, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 7200 * 1000),
        httpOnly: true,
      })
      .send(`${name} Sign In Successfully`);
    //
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};
