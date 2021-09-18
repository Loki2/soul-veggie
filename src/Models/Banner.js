const mongoose = require('mongoose');


const bannerSchema = new mongoose.Schema(
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

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;