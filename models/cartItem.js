const mongoose = require("mongoose");
const { Schema } = mongoose;

// CartItem Schema
const CartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  purchase: { type: Schema.Types.ObjectId, ref: "Purchase" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("CartItem", CartItemSchema);
