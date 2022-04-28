const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  pic: String,
  email: { type: String, required: true },
  admin: Boolean,
  phone: String,
});

// Fullname of the user
UserSchema.virtual("fullname").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
