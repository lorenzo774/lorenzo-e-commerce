const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("models");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
debug(db);
db.on("error", function () {
  debug("MongoDB connection error");
});

// Importing models
const User = require("./models/user");
const Category = require("./models/category");
const Product = require("./models/product");
const purchase = require("./models/purchase");
const CartItem = require("./models/cartItem");
const Purchase = require("./models/purchase");

// Save the new user
async function run() {
  try {
    const purchase = await Purchase.findById(
      "625339f3bcaab8e704e74089"
    ).populate("user");
    debug(purchase);
  } catch (error) {
    debug(error.message);
  }
}
run();

module.exports = app;
