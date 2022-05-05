const express = require("express");
const router = express.Router();

const Amenity = require("../models/Amenity");

router.get("/", async (req, res) => {
  const amenities = await Amenity.find();

  res.status(200).json({
    ok: true,
    amenities: amenities,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const amenity = await Amenity.findById(id);

  res.status(200).json({
    ok: true,
    amenity: amenity,
  });
});

router.post("/", async (req, res) => {
  const {name, description, services} = req.body;

  const amenity = new Amenity({
    name,
    description,
    services
  });

  const created = await amenity.save();

  if (created) {
    res.status(201).json({
      ok: true,
      message: "Amenity created",
      amenity: created,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error creating amenity",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const newAmenity = await Amenity.findByIdAndUpdate(id, update, {
    new: true,
  });

  if (newAmenity) {
    res.status(201).json({
      ok: true,
      message: "Amenity updated",
      amenity: newAmenity,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error updating amenity",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Amenity.findByIdAndDelete(id, (err, amenity) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting amenity",
        errors: err,
      });
    }
    if (!amenity) {
      return res.status(404).json({
        ok: false,
        message: "Amenity not found",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Amenity deleted",
    });
  });
});

module.exports = router;
