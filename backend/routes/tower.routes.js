const express = require("express");
const router = express.Router();

const Tower = require("../models/Tower");

router.get("/", async (req, res) => {
  const towers = await Tower.find();

  res.status(200).json({
    ok: true,
    towers: towers,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const tower = await Tower.findById(id);

  res.status(200).json({
    ok: true,
    tower: tower,
  });
});

router.post("/", async (req, res) => {
  const { name, address, apartments, amenities } = req.body;

  const TowerExist = await Tower.findOne({ name: name.toLowerCase() });

  if (TowerExist) {
    return res.status(400).json({ ok: false, error: "Tower already exists" });
  } else {
    const tower = new Tower({
      name: name.toLowerCase(),
      address,
      apartments,
      amenities,
    });

    const created = await tower.save();

    if (created) {
      res.status(201).json({
        ok: true,
        message: "Tower created",
        tower: created,
      });
    } else {
      res.status(500).json({
        ok: false,
        message: "Error creating tower",
      });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const newTower = await Tower.findByIdAndUpdate(id, update, {
    new: true,
  });

  if (newTower) {
    res.status(201).json({
      ok: true,
      message: "Tower updated",
      tower: newTower,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error updating tower",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Tower.findByIdAndDelete(id, (err, tower) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting tower",
        errors: err,
      });
    }
    if (!tower) {
      return res.status(404).json({
        ok: false,
        message: "Tower not found",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Tower deleted",
    });
  });
});

module.exports = router;
