const async = require("async");
const { body, validationResult } = require("express-validator");

const Category = require("../models/category");
const Product = require("../models/product");

// Get the list
module.exports.category_list = async function (req, res, next) {
  const categories = await Category.find();
  res.render("category_list", { title: "Category list", categories });
};

// Get the create page
module.exports.category_create_get = function (req, res, next) {
  res.render("category_create", { title: "Create a new category" });
};

// Create a new category
module.exports.category_create_post = [
  body("name", "Name must not be empty").trim().isLength({ min: 3 }),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 3 }),
  function (req, res, next) {
    const errors = validationResult(req);
    // Errors found
    if (!errors.isEmpty()) {
      return next(errors.array());
    }
    // No errors
    const { name, description } = req.body;
    const newCategory = new Category({
      name,
      description,
    });
    // Save the new category in the db
    newCategory.save(function (err) {
      if (err) {
        return next(err);
      }
      // No errors while saving
      res.redirect("/categories");
    });
  },
];

// Delete
module.exports.category_delete_post = function (req, res, next) {
  const { id } = req.params;
  async.parallel(
    {
      products: function (callback) {
        Product.find({ category: id }).exec(callback);
      },
      category: function (callback) {
        Category.findById(id).exec(callback);
      },
    },
    // After the queries
    function (err, { products, category }) {
      if (err) {
        return next(err);
      }
      if (!category) {
        res.send("Category not found");
      }
      // Products found
      if (products.length) {
        res.render("category_delete", {
          title: `Before removing ${category.name}...`,
          category,
          products,
        });
        return next("You can't remove this category");
      }
      // No products found
      Category.findByIdAndDelete(id, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/categories");
      });
    }
  );
};
