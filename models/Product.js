const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: String,
    description: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    thumbnail: String,
    productImages: [String],
    price: Number,
    discount: Number,
    category: String,
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
