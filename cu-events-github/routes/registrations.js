const express      = require('express');
const router       = express.Router();
const Registration = require('../models/Registration');
const Event        = require('../models/Event');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

// POST /api/registrations/:eventId — register for event
router.post('/:eventId', isLoggedIn, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    if (event.seatsLeft <= 0) return res.status(400).json({ success: false, message: 'No seats available' });
    if (event.status !== 'upcoming') return res.status(400).json({ success: false, message: 'Registration closed' });

    const already = await Registration.findOne({ event: event._id, user: req.session.userId });
    if (already) return res.status(400).json({ success: false, message: 'Already registered for this event' });

    const reg = await Registration.create({ event: event._id, user: req.session.userId });
    await Event.findByIdAndUpdate(event._id, { $inc: { seatsLeft: -1 } });

    res.status(201).json({ success: true, message: 'Registered successfully!', registration: reg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/registrations/:eventId — cancel registration
router.delete('/:eventId', isLoggedIn, async (req, res) => {
  try {
    const reg = await Registration.findOneAndDelete({ event: req.params.eventId, user: req.session.userId });
    if (!reg) return res.status(404).json({ success: false, message: 'Registration not found' });
    await Event.findByIdAndUpdate(req.params.eventId, { $inc: { seatsLeft: 1 } });
    res.json({ success: true, message: 'Registration cancelled' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/registrations/my — my registrations
router.get('/my/list', isLoggedIn, async (req, res) => {
  try {
    const regs = await Registration.find({ user: req.session.userId }).populate('event');
    res.json({ success: true, registrations: regs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/registrations/event/:eventId — all registrations for event (admin)
router.get('/event/:eventId', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const regs = await Registration.find({ event: req.params.eventId }).populate('user', 'name email uid department semester');
    res.json({ success: true, count: regs.length, registrations: regs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
