const express = require("express");
const router = express.Router();

// Controllerr
const productController = require("../controllers/productController");

// Get list
router.get("/", productController.product_list);

// Create
router.get("/create", productController.product_create_get);
router.post("/create", productController.product_create_post);

// Get product
router.get("/:id", productController.product_detail);

// Delete
router.post("/:id/delete", productController.product_delete_post);

// Update
router.get("/:id/update", productController.product_update_get);
router.post("/:id/update", productController.product_update_post);

module.exports = router;
