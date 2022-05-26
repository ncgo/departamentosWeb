const express = require('express')
const router = express.Router()

const Report = require('../models/Report')

router.get('/', async (req, res) => {
  const reports = await Report.find()

  res.status(200).json({
    ok: true,
    reports: reports,
  })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const report = await Report.findById(id)

  res.status(200).json({
    ok: true,
    report: report,
  })
})

router.get('/user/:id', async (req, res) => {
  const { id } = req.params

  const reports = await Report.find({ user: id, resolved: false })

  res.status(200).json({
    ok: true,
    reports: reports,
  })
})

router.get('/user/resolved/:id', async (req, res) => {
  const { id } = req.params

  const reports = await Report.find({ user: id, resolved: true })

  res.status(200).json({
    ok: true,
    reports: reports,
  })
})

router.post('/', async (req, res) => {
  const { user, description, subject, tower, apartment, status, resolved } =
    req.body

  const report = new Report({
    user,
    description,
    subject,
    tower,
    apartment,
    status,
    resolved,
  })

  const created = await report.save()

  if (created) {
    res.status(201).json({
      ok: true,
      message: 'Report created',
      report: created,
    })
  } else {
    res.status(500).json({
      ok: false,
      message: 'Error creating report',
    })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const update = req.body

  const newReport = await Report.findByIdAndUpdate(id, update, {
    new: true,
  })

  if (newReport) {
    res.status(201).json({
      ok: true,
      message: 'Report updated',
      report: newReport,
    })
  } else {
    res.status(500).json({
      ok: false,
      message: 'Error updating report',
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  Report.findByIdAndDelete(id, (err, report) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error deleting report',
        errors: err,
      })
    }
    if (!report) {
      return res.status(404).json({
        ok: false,
        message: 'Report not found',
      })
    }
    res.status(200).json({
      ok: true,
      message: 'Report deleted',
    })
  })
})

module.exports = router
