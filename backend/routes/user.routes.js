const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => { 
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
});

router.post('/', async (req, res) => {
    res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
    res.status(200).json(task);
});

router.delete('/:id', async (req, res) => {
    res.sendStatus(200)
});

module.exports = router;