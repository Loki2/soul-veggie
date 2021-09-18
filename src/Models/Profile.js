const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema(
  {
    firstname:{
        type: String,
        required: true
      },
    lastname:{
        type: String,
        required: true
    },
    market:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    dob:{
      type: Date,
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
    identity:{
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
    profile: {
      type: String,
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

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;