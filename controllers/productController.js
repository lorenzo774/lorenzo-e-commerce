const Product = require("../models/product");

// Get the list of products
module.exports.product_list = function (req, res, next) {};

// Get a single product by id
module.exports.product_detail = function (req, res, next) {};

// Get delete page
module.exports.product_delete_get = function (req, res, next) {};

// Delete page
module.exports.product_delete_post = function (req, res, next) {};

// Get product form page
module.exports.product_update_get = function (req, res, next) {};

// Update product
module.exports.product_update_post = function (req, res, next) {};

// Get product form page to create it
module.exports.product_create_get = function (req, res, next) {};

// Create a new product
module.exports.product_create_post = function (req, res, next) {};
