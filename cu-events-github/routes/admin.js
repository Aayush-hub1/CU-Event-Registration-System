const express      = require('express');
const router       = express.Router();
const User         = require('../models/User');
const Event        = require('../models/Event');
const Registration = require('../models/Registration');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

// GET /api/admin/stats
router.get('/stats', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const [totalUsers, totalEvents, totalRegistrations, upcomingEvents] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Event.countDocuments(),
      Registration.countDocuments({ status: 'registered' }),
      Event.countDocuments({ status: 'upcoming' })
    ]);
    res.json({ success: true, stats: { totalUsers, totalEvents, totalRegistrations, upcomingEvents } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/users
router.get('/users', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'student' }).select('-password');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/users/:id/role — promote to admin
router.put('/users/:id/role', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
    res.json({ success: true, message: 'Role updated', user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
