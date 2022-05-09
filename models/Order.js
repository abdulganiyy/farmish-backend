const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shippingAddress: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    status: String,
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
