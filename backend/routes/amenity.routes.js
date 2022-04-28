const express = require("express");
const router = express.Router();

const Amenity = require("../models/Amenity");
const Reports = require("../models/Reports");

router.get("/", async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Amenities",
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    ok: true,
    user: id,
  });
});

router.post("/", async (req, res) => {
  res.status(201).json({ ok: true, message: "Amenity created" });
});

router.put("/:id", async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Report updated",
    report: report,
  });
});


router.delete("/:id", async (req, res) => {

  const { id } = req.params;
  Reports.findByIdAndDelete(id, (err, report) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting report",
        errors: err,
      });
    }
    if (!report) {
      return res.status(400).json({
        ok: false,
        message: "The report doesn't exist",
        errors: { message: "The report doesn't exist" },
      });
    }
    res.status(200).json({
      ok: true,
      message: "Report deleted",
    });
  });
});

module.exports = router;
