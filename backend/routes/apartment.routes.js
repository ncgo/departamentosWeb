const express = require("express");
const router = express.Router();

const Apartment = require("../models/Apartment");
const Tower = require("../models/Tower");

router.get("/", async (req, res) => {
  const apartments = await Apartment.find();

  res.status(200).json({
    ok: true,
    apartments: apartments,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const apartment = await Apartment.findById(id);

  res.status(200).json({
    ok: true,
    apartment: apartment,
  });
});

router.post("/", async (req, res) => {
  const { name, tower } = req.body;

  const Towers = await Tower.findOne({ name: tower.toLowerCase()});

  if (!Towers) {
    return res.status(400).json({ ok: false, message: "Tower not found" });
  } else {

    const aptExist = await Apartment.findOne({ name: name.toLowerCase() });

    if (aptExist) {
      return res.status(400).json({ ok: false, message: "Apartment already exists" });
    }

    const apartment = new Apartment({
      name: name.toLowerCase(),
    });

    const apt = await apartment.save();

    Towers.apartments.push(apt._id);

    const towerSaved = await Towers.save();

    if (towerSaved) {
      res.status(200).json({
        ok: true,
        message: "Apartment created",
      });Towers
    } else {
      res.status(400).json({
        ok: false,
        message: "Error creating apartment",
      });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const newApartment = await Apartment.findByIdAndUpdate(id, update, {
    new: true,
  });

  if (newApartment) {
    res.status(201).json({
      ok: true,
      message: "Apartment updated",
      apartment: newApartment,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error updating apartment",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Apartment.findByIdAndDelete(id, (err, apartment) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting apartment",
        errors: err,
      });
    }
    if (!apartment) {
      return res.status(404).json({
        ok: false,
        message: "Apartment not found",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Apartment deleted",
    });
  });
});

module.exports = router;
