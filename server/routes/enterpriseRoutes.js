const express = require('express');
const router = express.Router();
const Enterprise = require('../models/Enterprise');
const authenticate = require('../utils/authMiddleware');
const authorize = require('../utils/authorize');

// Get all enterprises (Standard users can read)
router.get('/', authenticate, async (req, res) => {
  try {
    const enterprises = await Enterprise.findAll();
    res.json(enterprises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin users have full access to the CRUD
router.post('/', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const newEnterprise = await Enterprise.create(req.body);
    res.status(201).json(newEnterprise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:NIT', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const enterprise = await Enterprise.findByPk(req.params.NIT);
    if (enterprise) {
      await enterprise.update(req.body);
      res.json(enterprise);
    } else {
      res.status(404).json({ message: 'Enterprise not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:NIT', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const enterprise = await Enterprise.findByPk(req.params.NIT);
    if (enterprise) {
      await enterprise.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Enterprise not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;