const User = require("../models/user");

// Get signin
module.exports.signin_get = function (req, res, next) {
  res.render("signin", { title: "Sign in" });
};

// Post signin
module.exports.signin_post = function (req, res, next) {
  res.send("Not implemented");
};

// Get signup
module.exports.signup_get = function (req, res, next) {
  res.send("Signin");
};

// Create a new account
module.exports.signup_post = function (req, res, next) {
  res.send("Not implemented");
};
