// # 1
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// # 2
var towerSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      street_1: {
        type: String,
        required: true,
      },
      street_2: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postal_code: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    apartments: [
      {
        type: Schema.ObjectId,
        ref: "apartments",
        required: false,
      },
    ],
    amenities: [
      {
        type: Schema.ObjectId,
        ref: "amenities",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

// # 3
module.exports = mongoose.model("towers", towerSchema);
