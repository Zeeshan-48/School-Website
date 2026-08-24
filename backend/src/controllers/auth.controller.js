const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { sequelize } = require('../config/database');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both username and password.' });
    }

    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await admin.validatePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: 'Server configuration error. JWT secret missing.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

// Internal function to seed the initial admin (called on server start)
exports.seedAdmin = async () => {
  try {
    const count = await Admin.count();
    if (count === 0) {
      await Admin.create({
        username: 'admin',
        password: 'password123' // They can change this later
      });
      console.log('✅ Default Admin seeded: username: admin / password: password123');
    }
  } catch (error) {
    console.error('Failed to seed admin:', error);
  }
};
