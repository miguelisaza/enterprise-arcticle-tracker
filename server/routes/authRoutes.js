const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { generateToken } = require('../utils/jwt');

router.post('/login', async (req, res) => {
  try {
		const { username, password } = req.body;

		if (!username || !password) {
			throw new Error('Missing username or password')
		}

    const user = await User.findOne({ where: { username } });
    if (user && (await user.validPassword(password))) {
      const token = generateToken({ id: user.id, role: user.role, name: user.username }, process.env.JWT_SECRET, '1h');
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;