const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      maxlength: 10,
      minlength: 6
    },
    village: {
      type: String,
      required: true,
    },
    market: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
      maxlength: 10,
      minlength: 4
    },
    status: {
      type: String,
      required: true,
    },
    profiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      }
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      }
    ],
  },
  { timestamps: true }
);

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;