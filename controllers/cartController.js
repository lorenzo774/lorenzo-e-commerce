const async = require("async");
const { check, validationResult } = require("express-validator");

// Models
const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

module.exports.cart_list = function (req, res, next) {
  // If there is no current session
  if (!req.user) {
    res.redirect("/account/signin");
  }
  // Find all the items
  const { _id } = req.user;
  CartItem.find({ user: _id })
    .populate("product")
    .exec(function (err, items) {
      if (err) {
        return next(err);
      }
      // No errors
      res.render("items_list", { title: "Cart", items });
    });
};

// Create
module.exports.item_create_get = function (req, res, next) {
  Product.find().exec(function (err, products) {
    if (err) {
      return next(err);
    }
    // No errors
    res.render("item_create", { title: "Add a new item", products });
  });
};

module.exports.item_create_post = [
  // The quantity must be greater than 0
  check("quantity", "Invalid quantity").isInt({ min: 1 }),

  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If there is an error, display it
      Product.find().exec(function (err, products) {
        if (err) {
          return next(err);
        }
        // No errors
        res.render("item_create", {
          title: "Error",
          errors: errors.array(),
          products,
        });
      });
      return;
    }

    // No errors
    const { _id } = req.user;
    const { product, quantity } = req.body;

    // No errors
    const newCartItem = new CartItem({
      product,
      quantity,
      user: _id,
    });
    newCartItem.save(function (err) {
      if (err) {
        return next(err);
      }
      // No errors while saving to db
      res.redirect("../");
    });
  },
];

// Update
module.exports.item_update_get = function (req, res, next) {};

module.exports.item_update_post = function (req, res, next) {};

// Delete
module.exports.item_delete_get = function (req, res, next) {
  // Params
  const { itemId } = req.params;
  const { _id } = req.user;
  async.parallel(
    {
      item: function (callback) {
        CartItem.findById(itemId).populate("product").exec(callback);
      },
      user: function (callback) {
        User.findById(_id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      const { item, user } = results;
      if (!item || !user) {
        return next("User or item not found");
      }
      // No errors
      res.render("item_delete_form", {
        title: `Remove x${item.quantity} ${item.product}?`,
        user,
        item,
      });
    }
  );
};

module.exports.item_delete_post = function (req, res, next) {
  // Params
  const { itemId } = req.params;
  CartItem.findByIdAndDelete(itemId).exec(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("../..");
  });
};
