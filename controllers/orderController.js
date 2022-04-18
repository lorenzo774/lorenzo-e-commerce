const async = require("async");
// Models
const Order = require("../models/order");
const CartItem = require("../models/cartItem");
const User = require("../models/user");

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
module.exports.order_detail = function (req, res, next) {};

// Get create order page
module.exports.order_create_get = function (req, res, next) {};

// Create a new order
module.exports.order_create_post = function (req, res, next) {};
