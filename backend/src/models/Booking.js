const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: String,
  approved: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  spa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spa'
  }
});

module.exports = mongoose.model('Booking', BookingSchema);