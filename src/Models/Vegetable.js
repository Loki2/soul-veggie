const mongoose = require('mongoose');


const vegeSchema = new mongoose.Schema(
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
    import_price: {
      type: Number,
      required: true,
    },
    import_unit: {
      type: String,
      required: true,
    },
    export_price: {
      type: Number,
      required: true,
    },
    export_unit: {
      type: String,
      required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    status: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    suppliers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
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

const Vegetable = mongoose.model("Vegetable", vegeSchema);

module.exports = Vegetable;