const express = require("express");
const router = express.Router();

const Report = require("../models/Reports");

router.get("/", async (req, res) => {

  const reports = await Report.find();

  res.status(200).json({
    ok: true,
    reports: reports,
  });

});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const report = await Report.findById(id);

  res.status(200).json({
    ok: true,
    report: report,
  });
});

router.post("/", async (req, res) => {
  res.status(201).json({ ok: true, message: "Report created" });
});

router.put("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "Report updated" });
});

router.delete("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "Report deleted" });
});

module.exports = router;
