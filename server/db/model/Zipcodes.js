const mongoose = require('mongoose');

const zipcodeSchema = new mongoose.Schema({
  zip: {
    type: String,
    minLength: 5,
    maxLength: 5,
    unique: true,
    required: [true, 'please provide zipcode'],
    // type: Number,
    // min: 501,
    // max: 99950,
  },
  type: {
    type: String
  },
  decommissioned: {
    type: Number
  },
  primary_city: {
    type: String
  },
  acceptable_cities: {
    type: String
  },
  unacceptable_cities: {
    type: String
  },
  state: {
    type: String,
    minLength: 2,
    maxLength: 2,
    required: true
  },
  county: {
    type: String
  },
  timezone: {
    type: String
  },
  area_codes: {
    type: String
  },
  world_region: {
    type: String
  },
  country: {
    type: String
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  irs_estimated_population: {
    type: Number,
    required: true
  }
}, { timestamps: true });
zipcodeSchema.index({ zip: 1 });

module.exports = mongoose.model('zipcodes', zipcodeSchema);
