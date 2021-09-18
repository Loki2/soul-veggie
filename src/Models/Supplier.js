const mongoose = require('mongoose');


const supplierSchema = new mongoose.Schema(
  {
    orgname:{
      type: String,
      required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    province:{
      type: String,
      required: true
    },
    contact:{
      type: String,
      required: true
    },
    phone:{
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    vegetables: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vegetable"
      }
    ],
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;