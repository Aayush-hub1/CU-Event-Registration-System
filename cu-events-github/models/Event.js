const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ['Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar'], required: true },
  venue:       { type: String, required: true },
  date:        { type: Date, required: true },
  time:        { type: String, required: true },
  totalSeats:  { type: Number, required: true },
  seatsLeft:   { type: Number },
  organizer:   { type: String, required: true },
  image:       { type: String, default: '' },
  status:      { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

eventSchema.pre('save', function (next) {
  if (this.isNew) this.seatsLeft = this.totalSeats;
  next();
});

module.exports = mongoose.model('Event', eventSchema);
