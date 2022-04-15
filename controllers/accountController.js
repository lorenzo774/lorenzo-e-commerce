const User = require("../models/user");
const { body, validationResult } = require("express-validator");

// Get signin
module.exports.signin_get = function (req, res, next) {
  res.render("signin", { title: "Sign in" });
};

// Post signin
module.exports.signin_post = [
  // Validation
  body("username", "Username must be valid")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Get the user
  function (req, res, next) {
    const errors = validationResult(req);
    // There are errors
    if (!errors.isEmpty()) {
      return next(errors);
    }
    const { username, password } = req.body;
    // No errors
    User.findOne({ username, password }, function (err, user) {
      if (err) {
        return next(err);
      }
      res.redirect(user.url);
    });
  },
];

// Get signup
module.exports.signup_get = function (req, res, next) {
  res.render("signup", { title: "Create a new account" });
};

// Account detail
module.exports.account_detail = function (req, res, next) {
  // Get id
  const { id } = req.params;
  // Found the account
  User.findById(id, function (err, foundUser) {
    if (err) {
      return next(err);
    }
    // No errors
    res.render("account_detail", { user: foundUser });
  });
};

// Create a new account
module.exports.signup_post = [
  // Validation
  body("username", "Username required").trim().isLength({ min: 3 }).escape(),

  // Function to save a new user to the db
  function (req, res, next) {
    // Get errors from validation
    const errors = validationResult(req);
    // Errors found
    if (!errors.isEmpty()) {
      return next(err);
    }
    // Create a new user
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    newUser.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(newUser.url);
    });
  },
];
