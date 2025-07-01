const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// GET all announcements
router.get('/', async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 });
  res.json(announcements);
});

// POST new announcement
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const newAnnouncement = new Announcement({ message });
  await newAnnouncement.save();
  res.status(201).json(newAnnouncement);
});

// PUT - Update an announcement
router.put('/:id', async (req, res) => {
  const { message } = req.body;
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { message },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Announcement not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE announcement
router.delete('/:id', async (req, res) => {
  const deleted = await Announcement.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
