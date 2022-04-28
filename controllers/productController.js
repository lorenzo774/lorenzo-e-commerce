const Product = require("../models/product");
const CartItem = require("../models/cartItem");
const Category = require("../models/category");
const async = require("async");
const { body, validationResult } = require("express-validator");
// Upload for products image
const { productUpload } = require("../config/uploadConfig");
const { isAdmin, viewRole } = require("../middlewares/auth");

const getProducts = async () => await Product.find({});

// Get the list of products
module.exports.product_list = viewRole(
  "product_list",
  "product_list_admin",
  async function () {
    const products = await getProducts();
    return { title: "Products", products };
  }
);

// Get a single product by id
module.exports.product_detail = function (req, res, next) {
  const { id } = req.params;

  Product.findById(id)
    .populate("category")
    .exec(function (err, product) {
      if (err) {
        return next(err);
      }
      if (!product) {
        return next("Product not found");
      }
      const page = isAdmin(req.user)
        ? "product_detail_admin"
        : "product_detail";
      res.render(page, {
        title: `Product: ${product.name}`,
        product,
        deleteUrl: `${product.url}/delete`,
      });
    });
};

// Delete product
module.exports.product_delete_post = function (req, res, next) {
  const { id } = req.params;
  async.parallel(
    {
      product: function (callback) {
        Product.findById(id).exec(callback);
      },
      cartItems: function (callback) {
        CartItem.find({ product: id }).populate("user").exec(callback);
      },
    },
    // Function that will be called after the async functions
    function (err, { product, cartItems }) {
      if (err) {
        return next(err);
      }
      if (!product) {
        return next("Product not found");
      }
      if (cartItems.length) {
        res.render("product_detail", {
          title: `Unable to delete: ${product.name}`,
          product: product,
          itemsToDelete: cartItems,
        });
        return next("Unable to delete");
      }
      // Search the product and delete it
      Product.findByIdAndDelete(id, function (err) {
        if (err) {
          return next(err);
        }
        // No errors
        res.redirect("/products");
      });
    }
  );
};

// Get product form page
module.exports.product_update_get = function (req, res, next) {};

// Update product
module.exports.product_update_post = function (req, res, next) {};

// Get product form page to create it
module.exports.product_create_get = function (req, res, next) {
  Category.find({}).exec(function (err, categories) {
    if (err) {
      return next(err);
    }
    // No errors while querying the db
    res.render("product_create", { title: "Add a new product", categories });
  });
};

// Create a new product
module.exports.product_create_post = [
  // Upload image
  productUpload.single("image"),
  // Validation
  body("name", "Name must be valid").trim().isLength({ min: 3 }).escape(),
  function (req, res, next) {
    const { name, price, description, category } = req.body;
    console.log(req.file);
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      ...(req.file && { image: req.file.path.replace("public/", "/") }),
    });
    newProduct.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(newProduct.url);
    });
  },
];
