const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    vegetables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StockItem",
      },
    ],
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Sale", stockSchema);

module.exports = Stock;
