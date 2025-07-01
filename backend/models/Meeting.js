const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // e.g., "09:00"
    required: true,
  },
  endTime: {
    type: String, // e.g., "10:00"
    required: true,
  },
  location: {
    type: String,
    trim: true,
  },
  speaker: {
    type: String,
    trim: true,
  },
  track: {
    type: String,
    enum: ['tech', 'business', 'design', 'data', null], // Matches your frontend tracks, plus null for breaks
    default: null,
  },
  type: {
    type: String,
    enum: ['keynote', 'session', 'workshop', 'break', 'social', 'panel'], // Matches your frontend types
    default: 'session',
  },
  reminder: {
    type: Date, // Date/time for reminder notification
  },
  capacity: {
    type: String, // e.g., "Limited to 30 participants"
    trim: true,
  },
  // You can add more fields like attendees, resources, etc.
}, { timestamps: true });

module.exports = mongoose.model('Meeting', MeetingSchema);