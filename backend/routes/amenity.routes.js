const express = require("express");
const router = express.Router();

const Amenity = require("../models/Amenity");
const authenticateToken = require("../middleware/authenticateToken");

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
  const { name, description, services } = req.body;

  const amenity = new Amenity({
    name,
    description,
    services,
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

router.post("/:aid/reserve", authenticateToken, async (req, res) => {
  const { aid } = req.params;
  const { date, serviceId } = req.body;
  const { user } = req.user;

  const newReservation = {
    userId: user._id,
    date,
  };

  const newAmenity = await Amenity.findOneAndUpdate(
    { _id: aid },
    {
      $push: {
        "services.$[b].fecha_reservada": newReservation,
      },
    },
    {
      new: true,
      arrayFilters: [{ "b._id": serviceId }],
    }
  );

  if (newAmenity) {
    res.status(201).json({
      ok: true,
      message: "Amenity reserved successfully",
      amenity: newAmenity,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error reserving amenity",
    });
  }
});

router.get("/:aid/:sid", async (req, res) => {
  const { aid, sid } = req.params;

  const amenity = await Amenity.findById(aid, {
    services: { $elemMatch: { _id: sid } },
  });

  res.status(200).json({
    ok: true,
    amenity: amenity,
  });
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
