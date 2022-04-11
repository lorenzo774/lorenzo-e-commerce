const User = require("../models/user");
const Product = require("../models/product");
const async = require("async");

module.exports.index = async function (req, res, next) {
  async.parallel(
    {
      users_count: function (callback) {
        User.countDocuments().exec(callback);
      },
      products_count: function (callback) {
        Product.countDocuments().exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // If there are no errors
      const { users_count, products_count } = results;
      res.render("index", {
        title: "Welcome to lorenzo-e-commerce",
        users: users_count,
        products: products_count,
      });
    }
  );
};
