const { Listings } = require('../model');

const getListings = (params, options = '-_id -__v', limit = 10) => {
  return Listings.find(params, options).limit(limit).exec();
};

const getListingsAndDonors = (params, options = '-_id -__v', donorOptions = 'user_id email photo_url -_id') => {
  return Listings.find(params, options).populate('donor', donorOptions).exec();
};

const createNewListing = (params) => {
  return Listings.create(params);
};

const getNextListingId = () => {
  return Listings.findOne({}, 'listing_id').sort({listing_id: -1}).exec();
}

const updateListing = (listing_id, updateParams) => {
  return Listings.findOneAndUpdate({listing_id}, updateParams).exec();
};

module.exports = {
  getListings,
  getListingsAndDonors,
  createNewListing,
  getNextListingId,
  updateListing
};



