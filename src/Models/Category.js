const mongoose = require('mongoose');


const cateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String
    },
    desc: {
      type: String,
    },
    vegetables:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vegetable"
      }
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    image: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model("Category", cateSchema);

module.exports = Category;