const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const User = require("../models/User");

router.get("/:tower", async (req, res) => {
  const tower = req.params.tower;
  if (tower) {
    const messages = await Message.find({ tower: tower });
    res.status(200).json({
      ok: true,
      messages,
    });
  } else {
    return res.status(400).json({ ok: false, message: "Tower is required" });
  }
});
router.get("/first/:tower", async (req, res) => {
  const tower = req.params.tower;
  if (tower) {
    const messages = await Message.findOne({ tower: tower }).sort({ date: -1 });

    if (messages) {
      res.status(200).json({
        ok: true,
        messages,
      });
    } else {
      return res.status(200).json({ ok: false, message: "Tower is required" });
    }
  } else {
    return res.status(400).json({ ok: true, message: "Tower is required" });
  }
});

router.get("/message/:id", async (req, res) => {
  const { id } = req.params;

  const message = await Message.findById(id);

  if (message) {
    res.status(200).json({ ok: true, message: message });
  } else {
    res.status(404).json({ ok: false, message: "Message not found" });
  }
});

router.post("/", async (req, res) => {
  const { admin, tower, message, subject } = req.body;
  const adminName = await User.findById(admin);

  if (adminName) {
    const newMessage = new Message({
      admin,
      tower,
      subject,
      message,
      adminName: adminName.firstName + " " + adminName.lastName,
    });
    const messageSaved = await newMessage.save();
    if (messageSaved) {
      res.status(200).json({ ok: true, message: "Message saved" });
    } else {
      res.status(400).json({ ok: false, message: "Message not saved" });
    }
  } else {
    return res.status(400).json({ ok: false, message: "Admin not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const messageDeleted = await Message.findByIdAndDelete(id);

  if (messageDeleted) {
    res.status(200).json({ ok: true, message: "Message deleted" });
  } else {
    res.status(400).json({ ok: false, message: "Message not deleted" });
  }
});

module.exports = router;
