const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      maxlength: 10,
      minlength: 6
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    stocks:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock"
      }
    ],
    sales: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale"
      }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    image: {
      type: String,
      required: true
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;