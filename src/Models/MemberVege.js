const mongoose = require("mongoose");

const memberVegeSchema = new mongoose.Schema(
  {
    vegetable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vegetable",
    },
    qty: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    anount: {
      type: Number,
      required: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  },
  {
    timestamps: true,
  }
);

const MemberVege = mongoose.model("MemberVege", memberVegeSchema);

module.exports = MemberVege;
