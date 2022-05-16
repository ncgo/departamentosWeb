const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const config = require("../config");
const Amenity = require("../models/Amenity");
const authenticateToken = require("../middleware/authenticateToken");

async function sendMailConfirmation(mail, name, date, service) {
  let transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: false,
    auth: {
      user: config.mail.auth.user,
      pass: config.mail.auth.pass,
    },
  });

  let info = await transporter
    .sendMail({
      from: `'Apartment Manager <${config.mail.auth.user}>'`,
      to: mail,
      subject: "Service Reservation",
      text: `Hello ${name}, your reservation was succesfull on ${date} for ${service}`,
      html: `<h1>Hello ${name}, your reservation was succesfull on ${date} for ${service}</h1>`,
    })
    .then((info) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
}

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

    const service = newAmenity.services.filter((s) => {
      return s._id == serviceId;
    });

    sendMailConfirmation(
      user.email,
      user.firstName,
      date.toString(),
      service[0].name
    );
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
