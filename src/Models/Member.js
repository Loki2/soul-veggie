const mongoose = require('mongoose');


const memberSchema = new mongoose.Schema(
  {
    code:{
      type: String,
      required: true,
      maxlength: 10,
      minlength: 6
    },
    firstname:{
        type: String,
        required: true
      },
    lastname:{
        type: String,
        required: true
    },
    identity:{
      type: String,
      required: true
    },
    address:{
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
    vegetables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MemberVege"
      }
    ],
  },
  {
    timestamps: true
  }
)

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;