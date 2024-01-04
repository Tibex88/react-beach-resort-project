const express = require("express");
const app = express();
const cors = require("cors");
// const url = require("url");
const morgan = require("morgan");
const APIError = require("./utils/apiError");
const globalErrorHandler = require("./controller/errorController");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean") //might rremove the html tags that are needed
const hpp = require("hpp");

app.use(helmet());

app.use(
  express.json({
    limit: "100kb",
  })
);

// app.use(xss())
app.use(mongoSanitize({ allowDots: true }));
app.use(
  hpp()
  // whitelist: [
  // list of parameters that can be duplicated
  // ]
);
////////
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//Middlewares
app.use(
  cors({
    origin: "*",
    // withCredentials: true,
    // credentials: "include",
  })
);
app.use(express.static("../Client/public"));

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 100,
  windiwMs: 60 * 60 * 10000,
  message:
    "Too many requests hae been coming in from this IP, pleasve try again in an hour",
});
app.use("/", limiter);

app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();
  next();
});

// app.use(express.static("../Client/public")); //  path.join(__dirname, "public")

const userRouter = require("./routes/userRoutes");
const rockRouter = require("./routes/rockRoutes");
const editRouter = require("./routes/editRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const statRouter = require("./routes/statsRoutes");

app.use("/users", userRouter);
app.use("/rocks", rockRouter);
app.use("/edits", editRouter);
app.use("/feedback", feedbackRouter);
app.use("/statistics", statRouter);

app.all("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} in server plus`, 404));
});

app.use(globalErrorHandler);

//Create server
module.exports = app;