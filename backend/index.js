const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("./database");
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//Routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/report", require("./routes/report.routes"));
app.use("/api/tower", require("./routes/tower.routes"));
app.use("/api/apartment", require("./routes/apartment.routes"));
app.use("/api/login", require("./routes/login.routes"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Start server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
