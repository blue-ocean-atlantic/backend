const mongoose = require('mongoose');

// const tempSchema = new mongoose.Schema({},{strict: false});

const appointmentSchema = new mongoose.Schema({
  appointment_id: {
    type: Number,
    index: true,
    required: [true, 'please provide appointment_id'],
  },
  donor_id: { //references user_id
    type: Number,
    required: true
  },
  receiver_id: { //references user_id
    type: Number,
    required: true
  },
  listing_id: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true
  }
});
appointmentSchema.index({ appointment_id: 1 });

module.exports = mongoose.model('appointments', appointmentSchema);
