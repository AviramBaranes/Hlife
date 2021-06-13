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
    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "2d" });

    res
      .status(200)
      .cookie("jon", token, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2), //day * hour *second*2 = 2days
        httpOnly: true,
      })
      .send(`${name} Sign Up Successfully`);
    //
  } catch (err) {
    process.env.Node_ENV !== "test" && console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
      console.log("dfjsdakjfniusbngiusagiusbng");
      const err = new Error("Validation Error");
      err.statusCode = 422;
      err.data = errors.array();
      throw err;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send("User not find");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).send("Password is invalid");
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "2d" });

    res
      .status(200)
      .cookie("joh", token, {
        sameSite: "strict",
        path: "/",
        expires: new Date(new Date().getTime() + 24 * 3600 * 1000 * 2),
        httpOnly: true,
      })
      .send(`${user.name} Logged In Successfully!`);
  } catch (err) {
    process.env.Node_ENV !== "test" && console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};
