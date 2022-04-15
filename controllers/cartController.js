const async = require("async");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");

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

module.exports.item_create_post = function (req, res, next) {
  const { product, quantity } = req.body;
  const { id } = req.params;
  const newCartItem = new CartItem({
    product,
    quantity,
    user: id,
  });

  newCartItem.save(function (err) {
    if (err) {
      return next(err);
    }
    // No errors while saving to db
    res.redirect("../");
  });
};

// Update
module.exports.item_update_get = function (req, res, next) {};

module.exports.item_update_post = function (req, res, next) {};

// Delete
module.exports.item_delete_get = function (req, res, next) {};

module.exports.item_delete_post = function (req, res, next) {};
