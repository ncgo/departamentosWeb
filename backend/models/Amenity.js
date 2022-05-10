// # 1
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// # 2
var AmenitiesSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    services: [
      {
        name: {
          type: String,
          required: true,
        },
        fecha_reservada: [
          {
            id: {
              type: Schema.ObjectId,
              ref: "users",
              required: true,
            },
            date: {
              type: Date,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// # 3
module.exports = mongoose.model("amenities", AmenitiesSchema);
