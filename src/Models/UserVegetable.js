const mongoose = require('mongoose');


const userVegetableSchema = new mongoose.Schema(
  {
    vegetable:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vegetable",
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
    },
    anount: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

const UserVegetable = mongoose.model("UserVegetable", userVegetableSchema);

module.exports = UserVegetable;