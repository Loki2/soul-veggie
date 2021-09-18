const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    vegetable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vegetable",
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
