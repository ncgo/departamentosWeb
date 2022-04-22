// # 1
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// # 2
var reportSchema = Schema(
  {

    report_id: {
        type: String,
        required: true,
    },
    userName : {
        type: String,
        required: true,
    },
    userApartment : {
        type: String,
        required: true,
    },
    reportState : {
        type: String,
        required: true,
    },
    reportDate : {
        type: Date,
        required: true,
    }, 
    reportDescription : {
        type: String,
        required: true,
    },
    reportResolved : {
        type: Boolean,
        required: true,
    },

  },
  { timestamps: true }
);

// # 3
module.exports = mongoose.model("reports", reportSchema);
