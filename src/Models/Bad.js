const mongoose = require('mongoose');


const badSchema = new mongoose.Schema(
  {
    vegetable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vegetable"
      },
    qty: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Bad = mongoose.model("Bad", badSchema);

module.exports = Bad;