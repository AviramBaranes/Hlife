import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import mongoSanitize from "express-mongo-sanitize";
import RateLimiter from "express-rate-limit";
import express, { Request, Response, NextFunction } from "express";

import connectDb from "./utils/database";
import authRoute from "./routes/auth";
import { CustomError } from "./types/error";

declare global {
  namespace Express {
    interface Request {
      userId: any;
    }
  }
}

const csrfProtection = csrf({ cookie: true });
const app = express();

connectDb();

const limiter = new (RateLimiter as any)({
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

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

app.use(csrfProtection); //in frontend in the requests body put the token under _csrf

app.use("/auth", authRoute);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message, data } = error;

    if (!statusCode) statusCode = 500;
    if (!message) message = "Server Error";
    if (!data) data = null;

    res.status(statusCode).json({ message, data });
  }
);

app.listen(8080);
