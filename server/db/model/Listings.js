const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listing_id: {
    type: Number,
    index: true,
    required: [true, 'please provide listing_id'],
  },
  donor_id: { //references user_id //the creator of the listing
    type: Number,
    required: true,
    ref: 'users'
  },
  receiver_id: { //references user_id //the receiver of the listing // only updated by donor when they mark the listing as completed.
    type: Number,
  },
  type: {
    type: String,
    enum: ['swap', 'favor'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: { // swap only
    type: String
  },
  condition: { // swap only
    type: String
  },
  available_date: {
    type: Date,
    required: true
  },
  images_urls: {
    type: [String]
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
  },
  completed: {
    type: Boolean,
    default: false
  },
  completed_time: {
    type: Date
  },
}, {
  toJSON: { virtuals: true },
  timestamps: true
});

listingSchema.index({ listing_id: 1, zipcode: 1});

listingSchema.virtual('donor', {
  ref: 'users',
  localField: 'donor_id',
  foreignField: 'user_id',
});

const Listings = mongoose.model('listings', listingSchema);
module.exports = Listings;



// const tempSchema = new mongoose.Schema({},{strict: false});

// const locationSchema = new mongoose.Schema({
//   address: {
//     type: String
//   },
//   street: {
//     type: String
//   },
//   state: {
//     type: String,
//     minLength: 2,
//     maxLength: 2
//   },
//   street: {
//     type: String
//   },
//   zipcode: {
//     type: String,
//     minLength: 5,
//     maxLength: 5,
//     required: true
//     // type: Number,
//     // min: 501,
//     // max: 99950,
//   },
//   longitute: {
//     type: Number
//   },
//   latitude: {
//     type: Number
//   }
// });


