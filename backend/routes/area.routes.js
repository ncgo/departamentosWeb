const express = require("express");
const router = express.Router();

const Area = require("../models/Areas");

router.get("/", async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Areas",
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
  res.status(201).json({ ok: true, message: "Area created" });
});

router.put("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "Area updated" });
});

router.delete("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "Area deleted" });
});

module.exports = router;
