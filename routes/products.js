const express = require("express");
const router = express.Router();

// Controllerr
const productController = require("../controllers/productController");

const { authUser, authAdmin } = require("../middlewares/auth");

// Get list
router.get("/", [authUser, productController.product_list]);

// Create
router.get("/create", [authAdmin, productController.product_create_get]);
router.post("/create", [authAdmin, productController.product_create_post]);

// Get product
router.get("/:id", productController.product_detail);

// Delete
router.post("/:id/delete", [authAdmin, productController.product_delete_post]);

// Update
router.get("/:id/update", [authAdmin, productController.product_update_get]);
router.post("/:id/update", [authAdmin, productController.product_update_post]);

module.exports = router;
