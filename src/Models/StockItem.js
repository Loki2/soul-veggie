const mongoose = require("mongoose");

const stockItemSchema = new mongoose.Schema(
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

const StockItem = mongoose.model("StockItem", stockItemSchema);

module.exports = StockItem;
