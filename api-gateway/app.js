require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const mediaRouter = require("./routes/mediaRouter");
const usersRouter = require("./routes/usersRouter");
const courseRouter = require("./routes/courseRouter");
const refreshTokenRouter = require("./routes/refreshtokenRouter");
const verifyToken = require("./middlewares/verifytoken.middlewares");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/media", mediaRouter);
app.use("/users", usersRouter);
app.use("/course", verifyToken, courseRouter);
app.use("/refresh-tokens", refreshTokenRouter);
module.exports = app;
