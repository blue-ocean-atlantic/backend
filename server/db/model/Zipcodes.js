const mongoose = require('mongoose');

const zipcodeSchema = new mongoose.Schema({
  zip: {
    type: Number,
    min: 501,
    max: 99950,
    unique: true,
    required: [true, 'please provide zipcode'],
  },
  type: {
    type: String,
    required: true
  },
  decommissioned: {
    type: Number,
    required: true
  },
  primary_city: {
    type: String,
    required: true
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
  },
});

module.exports = mongoose.model('zipcodes', zipcodeSchema);
