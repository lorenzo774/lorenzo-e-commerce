const express = require("express");
const router = express.Router();

// Controller
const accountController = require("../controllers/accountController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");

// Sign up to the website
router.get("/signup", accountController.signup_get);
router.post("/signup", accountController.signup_post);
// Sign in to the website
router.get("/signin", accountController.signin_get);
router.post("/signin", accountController.signin_post);
// Log out
router.get("/logout", accountController.log_out);

// Get account info
router.get("/", accountController.account_detail);

// Get cart
router.get("/cart", cartController.cart_list);
// Create
router.get("/cart/create", cartController.item_create_get);
router.post("/cart/create", cartController.item_create_post);
// Update
router.get("/cart/:itemId/update", cartController.item_update_get);
router.post("/cart/:itemId/update", cartController.item_update_post);
// Delete
router.get("/cart/:itemId/delete", cartController.item_delete_get);
router.post("/cart/:itemId/delete", cartController.item_delete_post);

// Purchase
// Get list
router.get("/orders", orderController.order_list);
// Create
router.get("/orders/create", orderController.order_create_get);
router.post("/orders/create", orderController.order_create_post);
// Get
router.get("/orders/:orderId", orderController.order_detail);

module.exports = router;
