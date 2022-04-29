// # 1
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// # 2
var reportSchema = Schema(
  {
    report_num: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tower: {
      type: Schema.ObjectId,
      ref: "towers",
      required: true,
    },
    apartment: {
      type: Schema.ObjectId,
      ref: "apartments",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// # 3
module.exports = mongoose.model("reports", reportSchema);
