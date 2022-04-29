// # 1
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// # 2
var apartmentsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// # 3
module.exports = mongoose.model("apartments", apartmentsSchema);
