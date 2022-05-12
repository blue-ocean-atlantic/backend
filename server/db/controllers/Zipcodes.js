const Zipcodes = require('../model/Zipcodes');

const getZipcodes = (params, options) => {
  return Zipcodes.find(params, options).exec();
};

const getAllZipcodesAndGeolocations = () => {
  return Zipcodes.find({}, 'zip latitude longitude').exec();
};

const getZipcodesByState = (state) => {
  return Zipcodes.find({state}).exec();
};

module.exports = {
  getAllZipcodesAndGeolocations
};
