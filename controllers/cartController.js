const async = require("async");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const User = require("../models/user");

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

  // No errors
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
module.exports.item_delete_get = function (req, res, next) {
  // Params
  const { id, itemId } = req.params;
  async.parallel(
    {
      item: function (callback) {
        CartItem.findById(itemId).populate("product").exec(callback);
      },
      user: function (callback) {
        User.findById(id).exec(callback);
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
  const { id, itemId } = req.params;
  CartItem.findByIdAndDelete(itemId).exec(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("../");
  });
};
