const async = require("async");
const CartItem = require("../models/cartItem");

module.exports.cart_list = function (req, res, next) {
  const { id } = req.params;
  // Find all the items
  CartItem.find({ user: id })
    .populate("product")
    .exec(function (err, items) {
      if (err) {
        return next(err);
      }
      // No errors
      res.render("items_list", { title: "Cart", items });
    });
};

module.exports.cart_item_detail = function (req, res, next) {};

// Create
module.exports.item_create_get = function (req, res, next) {};

module.exports.item_create_post = function (req, res, next) {};

// Update
module.exports.item_update_get = function (req, res, next) {};

module.exports.item_update_post = function (req, res, next) {};

// Delete
module.exports.item_delete_get = function (req, res, next) {};

module.exports.item_delete_post = function (req, res, next) {};
