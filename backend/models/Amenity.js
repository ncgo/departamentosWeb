// # 1
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// # 2
var amenitySchema = Schema(
  {
    id: {
      type: String,
      required: true,
    },
    reservations: [
      {
        userName: {
          type: String,
          required: true,
        },
        userApartment: {
            type: String,
            required: true,
        },
        schedule: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// # 3
module.exports = mongoose.model("amenidades", amenitySchema);
