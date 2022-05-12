const { Listings } = require('../model');

const getListings = (params, options) => {
  return Listings.find(params, options).exec();
};

const getListingsZipcode = (zipcodes) => {
  return Listings.find({zipcode: { $in: zipcodes } }).exec();
};

module.exports = {
  getListings
};



