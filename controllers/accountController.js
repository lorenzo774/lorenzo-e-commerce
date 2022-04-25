const { body, validationResult } = require("express-validator");
const async = require("async");
const passport = require("passport");
const bcrypt = require("bcryptjs");
// Multer instance with storage engine to upload profile pictures
const { picUpload } = require("../config/uploadConfig");

// Models
const User = require("../models/user");
const CartItem = require("../models/cartItem");
const Order = require("../models/order");

// Get signin
module.exports.signin_get = function (req, res, next) {
  res.render("signin", { title: "Sign in" });
};

// Post signin
module.exports.signin_post = [
  // Validation
  body("email", "Email must be valid").trim().isLength({ min: 1 }).escape(),

  // Get the user
  function (req, res, next) {
    const errors = validationResult(req);
    // There are errors
    if (!errors.isEmpty()) {
      return next(errors.array());
    }
    next();
  },

  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/account",
  }),

  // Authenticate

  // User.findOne({ username, password }, function (err, user) {
  //   if (err) {
  //     return next(err);
  //   }
  // });
];

// Get signup
module.exports.signup_get = function (req, res, next) {
  res.render("signup", { title: "Create a new account" });
};

// Account detail
module.exports.account_detail = function (req, res, next) {
  // Get id
  const { _id } = req.user;
  // Get user and cart items
  async.parallel(
    {
      user: function (callback) {
        User.findById(_id).exec(callback);
      },
      cartItems: function (callback) {
        CartItem.countDocuments({ user: _id }).exec(callback);
      },
      orders: function (callback) {
        Order.countDocuments({ user: _id }).exec(callback);
      },
    },
    function (err, { user, cartItems, orders }) {
      if (err) {
        return next(err);
      }
      // No errors
      res.render("account_detail", {
        title: "Account",
        user,
        cartItems,
        orders,
      });
    }
  );
};

// Create a new account
module.exports.signup_post = [
  // Multer
  picUpload.single("profilePicture"),

  // Validation
  body("email", "Email required").trim().isLength({ min: 3 }).escape(),

  // Function to save a new user to the db
  function (req, res, next) {
    // Get errors from validation
    const errors = validationResult(req);
    // Errors found
    if (!errors.isEmpty()) {
      return next(err);
    }
    const { first_name, last_name, email, password } = req.body;
    // Crypt password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      // No errors
      const newUser = new User({
        first_name,
        last_name,
        email,
        // Add the pic property only if there is a file uploaded
        ...(req.file && { pic: req.file.path.replace("public/", "") }),
        password: hashedPassword,
      });
      newUser.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/account/signin");
      });
    });
  },
];

module.exports.log_out = function (req, res, next) {
  req.logout();
  res.redirect("/");
};
