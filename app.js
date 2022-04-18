const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("models");

// Ruoters
const indexRouter = require("./routes/index");
const accountRuoter = require("./routes/account");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/category");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.enable("strict routing");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/account", accountRuoter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Test models
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/lorenzo-e-commerce";
// Create the connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Connection with the db
const db = mongoose.connection;
db.on("error", function () {
  debug("MongoDB connection error");
});

module.exports = app;
