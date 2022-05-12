// # 1
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// # 2
var messageSchema = Schema(
  {
    admin: {
        type: Schema.ObjectId,
        ref: "users",
        required: true,
    },
    adminName: {
        type: String,
        required: true,
    },
    tower: {
        type: Schema.ObjectId,
        ref: "towers",
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
  },
  { timestamps: true }
);

// # 3
module.exports = mongoose.model("messages", messageSchema);
