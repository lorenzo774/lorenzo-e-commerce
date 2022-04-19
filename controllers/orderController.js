const async = require("async");
// Models
const Order = require("../models/order");
const CartItem = require("../models/cartItem");
const User = require("../models/user");
const { DateTime } = require("luxon");

// Get list of order
module.exports.order_list = function (req, res, next) {
  const { id } = req.params;
  async.parallel(
    {
      orders: function (callback) {
        Order.find({ user: id }).exec(callback);
      },
      user: function (callback) {
        User.findById(id).exec(callback);
      },
    },
    function (err, { orders, user }) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(err);
      }
      res.render("order_list", {
        title: `Orders of ${user.username}`,
        orders,
      });
    }
  );
};

// Get detail about a order
module.exports.order_detail = function (req, res, next) {
  const { id, orderId } = req.params;
  async.parallel(
    {
      items: function (callback) {
        CartItem.find({ order: orderId }).populate("product").exec(callback);
      },
      order: function (callback) {
        Order.findById(orderId).exec(callback);
      },
    },
    // After the queries
    function (err, { items, order }) {
      if (err) {
        return next(err);
      }
      if (!order || !items.length) {
        res.send("Order not found");
      }
      res.render("order_detail", { title: "Order detail", order, items });
    }
  );
};

// Get create order page
module.exports.order_create_get = function (req, res, next) {
  const { id } = req.params;
  async.parallel(
    {
      items: function (callback) {
        CartItem.find({ user: id }).populate("product").exec(callback);
      },
      user: function (callback) {
        User.findById(id).exec(callback);
      },
      // After the queries
    },
    function (err, { items, user }) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next("User not found");
      }
      if (!items.length) {
        return next("No items in the cart");
      }
      res.render("order_create", { title: "Place a new order", user, items });
    }
  );
};

// Create a new order
module.exports.order_create_post = function (req, res, next) {
  const { id } = req.params;
  CartItem.find({ user: id }).exec(function (err, items) {
    if (err) {
      return next(err);
    }
    if (!items.length) {
      return next("Items not found");
    }
    // No errors
    const newOrder = new Order({
      user: id,
      date: DateTime.now(),
    });
    // Save the order
    newOrder.save(function (err) {
      if (err) {
        return next(err);
      }
      // Update the items
      CartItem.updateMany(
        { user: id },
        { $unset: { user: 1 }, $set: { order: newOrder._id } }
      ).exec(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(newOrder.url);
      });
    });
  });
};
