const express = require("express");
const router = express.Router();

const Tower = require("../models/Tower");
const User = require("../models/User");
const Apartment = require("../models/Apartment");

router.get("/", async (req, res) => {
  const towers = await Tower.find();

  res.status(200).json({
    ok: true,
    towers: towers,
  });
});

router.get("/towers/:id", async (req, res) => {
  const { id } = req.params;

  const towers = await User.findById(id).populate("tower");
  
  var towerList = [{}];
  towerList.pop();

  for (let i = 0; i < towers.administers_towers.length; i++) {
    var tw = await Tower.findById(towers.administers_towers[i]);
    towerList.push(tw);
  }
  
  res.status(200).json({
    ok: true,
    towers: towerList,
  });
});

router.get("/apartments/:id", async (req, res) => {
  const { id } = req.params;
  const apartments = await Tower.findById(id).populate("apartments");

  console.log(apartments.apartments);
  res.status(200).json({
    ok: true,
    apartments: apartments.apartments,
  });
});

router.get("/apartment/:id", async (req, res) => {
  const { id } = req.params;
  const apartment = await Apartment.findById(id);
  const tenants = await User.find({"apartment": id});
  res.status(200).json({
    ok: true,
    tenants: tenants,
    apartment: apartment.name,
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
    return res.status(409).json({ ok: false, message: "Tower already exists" });
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

router.post("/admin/:id", async (req, res) => {
  const { id } = req.params;
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

    const user = await User.findById(id);

    user.administers_towers.push(created._id);

    const updated = await user.save();

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
