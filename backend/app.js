require("dotenv").config({ path: "./config.env" });

const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const mongoSanitize = require("express-mongo-sanitize");
const RateLimiter = require("express-rate-limit");
const connectDb = require("./utils/database");
const express = require("express");

const authRoute = require("./routes/auth");

const csrfProtection =
  process.env.Node_ENV === "test"
    ? csurf(
        {
          ignoreMethods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
        },
        { cookie: true }
      )
    : csrf({ cookie: true });
const app = express();

connectDb();

const limiter = new RateLimiter({
  max: 100,
  windowMs: 15 * 60 * 1000,
});

app.disable("x-powered-by");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(helmet()); //a collection of middleware functions that improve the security of HTTP headers
app.use(express.json());
app.use(hpp()); //HPP puts array parameters in req.query and/or req.body aside and just selects the last parameter value.
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
); //Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(limiter); // Protect the system against brute force
app.get("/", csrfProtection, function (req, res) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("SET");
});

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use(csrfProtection); //in frontend in the requests body put the token under _csrf

app.use("/auth", authRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const { statusCode, message, data } = error;
  if (!statusCode || !message || !data) {
    return res.status(500).send("Server Error");
  }
  res.status(statusCode).json({ message, data });
});

app.listen(8080);
