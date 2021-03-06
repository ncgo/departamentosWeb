const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
const nodemailer = require("nodemailer");
const config = require("../config");
const User = require("../models/User");
const Tower = require("../models/Tower");
const Apartment = require("../models/Apartment");

router.get("/", async (req, res) => {
  const users = await User.find();
  var users_info = [];
  for (var i = 0; i < users.length; i++) {
    // if (!users[i].activated) {
    //   continue;
    // }
    const tower = await Tower.findById(users[i].tower);
    var tower_name = "";
    if (tower) {
      tower_name = tower.name;
    }
    const apartment = await Apartment.findById(users[i].apartment);
    var apartment_name = "";
    if (apartment) {
      apartment_name = apartment.name;
    }
    var user_info = {
      _id: users[i]._id,
      firstName: users[i].firstName,
      lastName: users[i].lastName,
      birthDate: users[i].birthDate,
      email: users[i].email,
      password: users[i].password,
      role: users[i].role,
      phone: users[i].phone,
      tower: users[i].tower,
      administers_towers: users[i].administers_towers,
      apartment: users[i].apartment,
      towerName: tower_name,
      apartmentName: apartment_name,
      activated: users[i].activated,
    };
    users_info.push(user_info);
  }
  res.status(200).json({
    ok: true,
    users: users_info,
  });
});

router.get("/requests/getdeactivated", async (req, res) => {
  const users = await User.find();
  var users_info = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].activated) {
      continue;
    }
    const tower = await Tower.findById(users[i].tower);
    var tower_name = "";
    if (tower) {
      tower_name = tower.name;
    }
    const apartment = await Apartment.findById(users[i].apartment);
    var apartment_name = "";
    if (apartment) {
      apartment_name = apartment.name;
    }
    var user_info = {
      _id: users[i]._id,
      firstName: users[i].firstName,
      lastName: users[i].lastName,
      birthDate: users[i].birthDate,
      email: users[i].email,
      password: users[i].password,
      role: users[i].role,
      phone: users[i].phone,
      tower: users[i].tower,
      administers_towers: users[i].administers_towers,
      apartment: users[i].apartment,
      towerName: tower_name,
      apartmentName: apartment_name,
    };
    users_info.push(user_info);
  }
  res.status(200).json({
    ok: true,
    users: users_info,
  });
});

router.get("/tower/:tower?", async (req, res) => {
  const tower = req.params.tower;

  if (tower != undefined) {
    const users = await User.find({ tower: tower });
    res.status(200).json({
      ok: true,
      users: users,
    });
  } else {
    res.status(400).json({
      ok: false,
      err: "No tower provided",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if(!id){
    res.status(400).json({
      ok: false,
      err: "No id provided"
    });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      ok: false,
      message: "User not found",
    });
  } else {
    const tower = await Tower.findById(user.tower);
    var tower_name = "";
    if (tower) {
      tower_name = tower.name;
    }
    const apartment = await Apartment.findById(user.apartment);
    var apartment_name = "";
    if (apartment) {
      apartment_name = apartment.name;
    }
    const User = {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      phone: user.phone,
      role: user.role,
      tower: tower_name,
      apartment: apartment_name,
    };

    // console.log(user);

    res.status(200).json({
      ok: true,
      user: User,
    });
  }
});

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    tower,
    phone,
    apartment,
    email,
    role,
    // password,
  } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(400).json({ ok: false, message: "User already exists" });
  }

  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
  });

  var user = new User({
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    birthDate,
    phone,
    tower: tower.toLowerCase(),
    apartment: apartment.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
    activated: false,
  });

  const towerN = await Tower.findOne({ name: tower.toLowerCase() });

  if (towerN) {
    user.tower = towerN._id;
    if (role !== "admin") {
      const apt = await Apartment.findOne({ name: apartment.toLowerCase() });
      if (apt) {
        user.apartment = apt._id;
      } else {
        return res
          .status(404)
          .json({ ok: false, message: "Apartment not found" });
      }
    } else {
      user.apartment = null;
      user.administers_towers.push(towerN._id);
    }
  } else {
    return res.status(404).json({ ok: false, message: "Tower not found" });
  }

  user.password = await user.encryptPassword(password);

  const created = await user.save();

  if (created) {
    const name = `${firstName} ${lastName}`;
    await sendPass(email, name, password);
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
  const { id } = req.params;
  const update = req.body;

  const newUser = await User.findByIdAndUpdate(id, update, {
    new: true,
  });

  if (newUser) {
    res.status(201).json({
      ok: true,
      message: "User updated",
      user: newUser,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error updating user",
    });
  }
});

router.put("/activate/:id", async (req, res) => {
  const { id } = req.params;

  const newUser = await User.findByIdAndUpdate(id, { activated: true });

  if (newUser) {
    res.status(201).json({
      ok: true,
      message: "User updated",
      user: newUser,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error updating user",
    });
  }
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

async function sendPass(mail, name, pass) {
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
      subject: "Password",
      text: `Hello ${name}, your password is ${pass}`,
      html: `<h1>Hello ${name}, your password is ${pass}</h1>`,
    })
    .then((info) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
}

module.exports = router;
