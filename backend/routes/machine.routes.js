const express = require("express");
const router = express.Router();

const Machine = require("../models/Machine");

router.get("/", async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Machines",
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
  res.status(201).json({ ok: true, message: "Machine created" });
});

router.put("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "Machine updated" });
});

router.delete("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "Machine deleted" });
});

module.exports = router;
