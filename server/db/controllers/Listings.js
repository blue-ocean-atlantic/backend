const { Listings } = require('../model');

const getListings = (params, options = '-_id -__v', limit = 10) => {
  return Listings.find(params, options).limit(limit).exec();
};

const getListingsZipcode = (zipcodes) => {
  return Listings.find({zipcode: { $in: zipcodes } }).exec();
};

const getListingsAndDonors = (params, options = '-_id -__v', donorOptions = 'user_id email photo_url -_id') => {
  return Listings.find(params, options).populate('donor', donorOptions).exec();
};

module.exports = {
  getListings,
  getListingsAndDonors
};



