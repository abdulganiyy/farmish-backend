const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    email: String,
    role: {
      type: String,
      default: "buyer",
    },
    phone: String,
    avatar: String,
    balance: Number,
    password: String,
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
