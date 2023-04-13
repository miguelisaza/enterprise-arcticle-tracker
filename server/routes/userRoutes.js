const express = require('express');
const router = express.Router();
const User = require('../models/User');

const authenticate = require('../utils/authMiddleware');
const authorize = require('../utils/authorize');

// Get all users
router.get('/', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json({ message: 'User created' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
		const existingUser = await User.findOne({ where: { email: req.body.email } });

		if (existingUser) {
			throw new Error('User already exists')
    }
		
    await User.create(req.body);
	
    res.status(201).json({ message: 'User created!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user by ID
router.put('/:id', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user by ID
router.delete('/:id', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;