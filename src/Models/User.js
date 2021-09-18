const mongoose = require('mongoose');
const { roles } = require('../Utils/constants');


const userSchema = new mongoose.Schema(
  {
    username:{
        type: String,
        required: true
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password:{
      type: String,
      required: true,
      minlength: 6
    },
    sales: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale",
      }
    ],
    vegetables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserVegetable",
      }
    ],
    carts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      }
    ],
    profiles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    role: {
      type: String,
      enum: [roles.admin, roles.manager, roles.user],
      default: roles.user
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

const User = mongoose.model("User", userSchema);

module.exports = User;