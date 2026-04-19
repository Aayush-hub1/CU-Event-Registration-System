const express      = require('express');
const router       = express.Router();
const Event        = require('../models/Event');
const Registration = require('../models/Registration');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

// GET /api/events — all events (public)
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status)   filter.status   = status;
    const events = await Event.find(filter).sort({ date: 1 });
    res.json({ success: true, count: events.length, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/events/:id — single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/events — create event (admin only)
router.post('/', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { title, description, category, venue, date, time, totalSeats, organizer, image } = req.body;
    const event = await Event.create({
      title, description, category, venue, date, time, totalSeats, organizer, image,
      createdBy: req.session.userId
    });
    res.status(201).json({ success: true, message: 'Event created', event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/events/:id — update event (admin only)
router.put('/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, message: 'Event updated', event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/events/:id — delete event (admin only)
router.delete('/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    await Registration.deleteMany({ event: req.params.id });
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
