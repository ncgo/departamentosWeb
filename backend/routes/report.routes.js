const express = require("express");
const router = express.Router();

const Report = require("../models/Report");

router.get("/", async (req, res) => {
  const reports = await Report.find();

  res.status(200).json({
    ok: true,
    reports: reports,
  });
});

//Get all active reports for a particular tower
router.get("/tower/:id", async (req, res) => {
  const { id } = req.params;
  const reports = await Report.find({ tower: id, resolved: false });

  res.status(200).json({
    ok: true,
    reports: reports,
  });
});

//Get all resolved reports for a particular tower
router.get("/tower/resolved/:id", async (req, res) => {
  const { id } = req.params;
  const reports = await Report.find({ tower: id, resolved: true });

  res.status(200).json({
    ok: true,
    reports: reports,
  });
});

//Get a particular report
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const report = await Report.findById(id);

  res.status(200).json({
    ok: true,
    report: report,
  });
});

//Get all active reports for a particular user
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const reports = await Report.find({ user: id, resolved: false });

  res.status(200).json({
    ok: true,
    reports: reports,
  });
});

//Get all resolved reports for a particular user
router.get("/user/resolved/:id", async (req, res) => {
  const { id } = req.params;

  const reports = await Report.find({ user: id, resolved: true });

  console.log(reports);

  res.status(200).json({
    ok: true,
    reports: reports,
  });
});

router.post("/", async (req, res) => {
  const { user, description, subject, tower, apartment, status, resolved } =
    req.body;

  const report = new Report({
    user,
    description,
    subject,
    tower,
    apartment,
    status,
    resolved,
  });

  const created = await report.save();

  if (created) {
    res.status(201).json({
      ok: true,
      message: "Report created",
      report: created,
    });
  } else {
    res.status(500).json({
      ok: false,
      message: "Error creating report",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const status = update.status;
  var resolved = false;
  if (status === "Resolved") {
    resolved = true;
    const newReport = await Report.findByIdAndUpdate(id, {
      status: status,
      resolved: resolved,
    });
    if (newReport) {
      res.status(201).json({
        ok: true,
        message: "Report updated",
        report: newReport,
      });
    } else {
      res.status(500).json({
        ok: false,
        message: "Error updating report",
      });
    }
  } else {
    const newReport = await Report.findByIdAndUpdate(id, {
      status: status,
    });
    if (newReport) {
      res.status(201).json({
        ok: true,
        message: "Report updated",
        report: newReport,
      });
    } else {
      res.status(500).json({
        ok: false,
        message: "Error updating report",
      });
    }
  } 


});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Report.findByIdAndDelete(id, (err, report) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error deleting report",
        errors: err,
      });
    }
    if (!report) {
      return res.status(404).json({
        ok: false,
        message: "Report not found",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Report deleted",
    });
  });
});

module.exports = router;
