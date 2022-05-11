const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({},{strict: false});

const locationSchema = new mongoose.Schema({
  address: {
    type: String
  },
  street: {
    type: String
  },
  state: {
    type: String,
    minLength: 2,
    maxLength: 2
  },
  street: {
    type: String
  },
  zipcode: {
    type: String,
    minLength: 5,
    maxLength: 5,
    required: true
    // type: Number,
    // min: 501,
    // max: 99950,
  },
  longitute: {
    type: Number
  },
  latitude: {
    type: Number
  }
});

const listingSchema = new mongoose.Schema({
  listing_id: {
    type: Number,
    index: false,
    required: [false, 'please provide listing_id'],
  },
  created_by: { //references user_id
    type: Number,
    required: false
  },
  type: {
    type: String,
    enum: ['swap', 'favor'],
    required: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  available_date: {
    type: String, // this should be date?
    required: false
  },
  images_urls: {
    type: [String]
  },
  zipcode: {
    type: Number,
    minLength: 5,
    maxLength: 5,
    // required: false
    // type: Number,
    // min: 501,
    // max: 99950,
  },
  location: {
    type: tempSchema,
  },
  ended: {
    type: Boolean,
    required: false,
    default: false
  },
  ended_time: {
    type: Date
  }
});

listingSchema.index({ listing_id: 1, zipcode: 1});

const Questions = mongoose.model('listings', listingSchema);

module.exports = Questions;