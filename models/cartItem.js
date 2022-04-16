const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

// CartItem Schema
const CartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  purchase: { type: Schema.Types.ObjectId, ref: "Purchase" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

CartItemSchema.virtual("url").get(function () {
  let userUrl;
  User.findById(this.user).exec(function (_, user) {
    userUrl = user.url;
  });
  return `${userUrl}/cart/${this._id}`;
});

module.exports = mongoose.model("CartItem", CartItemSchema);
