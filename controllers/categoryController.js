const async = require("async");
const { body, validationResult } = require("express-validator");

const Category = require("../models/category");
const Product = require("../models/product");

// Handle roles
const { authError, viewRole } = require("../middlewares/auth");

// Find by Products by category
const getProductsByCategory = (res, name) =>
  Category.findOne({ name })
    .then((category) => {
      return Product.find({ category: category.id });
    })
    .catch(() => authError(res, "Category not found"));

const getCategories = async () => await Category.find({});

// Get the list
module.exports.category_list = viewRole(
  "category_list",
  "category_list_admin",
  async function () {
    const categories = await getCategories();
    return {
      title: "Categories",
      categories,
    };
  }
);

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
      name: name.toLowerCase(),
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

// Search by category
module.exports.search_by_category = viewRole(
  "product_list",
  "product_list_admin",
  async function (req, res, next) {
    const { name } = req.params;
    const products = await getProductsByCategory(res, name);
    // Return
    return {
      title: `${name} products`,
      products,
    };
  }
);
