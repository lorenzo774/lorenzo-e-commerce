const express = require("express");
const router = express.Router();

// Controller
const accountController = require("../controllers/accountController");
const cartController = require("../controllers/cartController");
const purchaseController = require("../controllers/purchaseController");
const purchase = require("../models/purchase");

// Sign up to the website
router.get("/signup", accountController.signup_get);
router.post("/signup", accountController.signup_post);
// Sign in to the website
router.get("/signin", accountController.signin_get);
router.post("/signin", accountController.signin_post);

// Get account info
router.get("/:id", accountController.account_detail);

// Get cart
router.get("/:id/cart", cartController.cart_list);
// Get
router.get("/:id/cart/:itemId", cartController.cart_item_detail);
// Create
router.get("/:id/cart/create", cartController.item_create_get);
router.post("/:id/cart/create", cartController.item_create_post);
// Update
router.get("/:id/cart/:itemId/update", cartController.item_update_get);
router.post("/:id/cart/:itemId/update", cartController.item_update_post);
// Delete
router.get("/:id/cart/:itemId/delete", cartController.item_delete_get);
router.post("/:id/cart/:itemId/delete", cartController.item_delete_post);

// Purchase
// Get list
router.get("/:id/purchase", purchaseController.purchase_list);
// Get
router.get(
  "/:id/cart/purchase/:purchaseId",
  purchaseController.purchase_detail
);
// Create
router.get("/:id/purchase/create", purchaseController.purchase_create_get);
router.post("/:id/purchase/create", purchaseController.purchase_create_post);

module.exports = router;
