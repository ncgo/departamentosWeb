const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.get("/", async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    ok: true,
    users: users,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      ok: false,
      message: "User not found",
    });
  } else {
    res.status(200).json({
      ok: true,
      user: user,
    });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    birthDate,
    phone,
    apartment,
    email,
    password,
    role,
  } = req.body;

  const user = new User({
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    birthDate,
    phone,
    apartment,
    email: email.toLowerCase(),
    password,
    role,
  });

  user.password = await user.encryptPassword(password);

  const created = await user.save();

  if (created) {
    res.status(201).json({
      ok: true,
      message: "User created",
      user: created,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error creating user",
    });
  }
});

router.put("/:id", async (req, res) => {
  res.status(200).json({ ok: true, message: "User updated" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting user",
        errors: err,
      });
    }
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      ok: true,
      message: "User deleted",
    });
  });
});

module.exports = router;
