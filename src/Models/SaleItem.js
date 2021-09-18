const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema(
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

const SaleItem = mongoose.model("SaleItem", saleItemSchema);

module.exports = SaleItem;
