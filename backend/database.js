const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("db connected"))
  .catch((err) => console.log(err));

  module.exports = mongoose;