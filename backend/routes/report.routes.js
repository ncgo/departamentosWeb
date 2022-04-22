const express = require("express");
const router = express.Router();

const Report = require("../models/Reports");

router.get("/", async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Reports",
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
  res.status(201).json({ ok: true, message: "Report created" });
});

router.put("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "Report updated" });
});

router.delete("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "Report deleted" });
});

module.exports = router;
