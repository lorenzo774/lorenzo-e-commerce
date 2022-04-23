const mongoose = require("mongoose");
const { Schema } = mongoose;

// CartItem Schema
const CartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

CartItemSchema.virtual("deleteUrl").get(function () {
  return `/account/cart/${this._id}/delete`;
});

module.exports = mongoose.model("CartItem", CartItemSchema);
