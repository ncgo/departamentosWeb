const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Users",
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
  res.status(201).json({ ok: true, message: "User created" });
});

router.put("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "User updated" });
});

router.delete("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "User deleted" });
});

module.exports = router;
