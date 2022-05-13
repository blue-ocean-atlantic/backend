const { Listings } = require('../model');

const getListings = (params, options, limit = 10) => {
  // return Listings.find(params, options).limit(limit).populate('donor', 'user_id email photo_url');
  // return Listings.find(params, options).populate('donor', 'user_id email photo_url');
  // return Listings.findOne(params).populate('donor');
  return Listings.find(params, options).exec();
};

const getListingsZipcode = (zipcodes) => {
  return Listings.find({zipcode: { $in: zipcodes } }).exec();
};

module.exports = {
  getListings
};



