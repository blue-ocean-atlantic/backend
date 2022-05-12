const searchListings = require('./searchListings');
const details = require('./details');
const createPost = require('./createPost');
const getLanding = require('./getLanding');
const getUserInfo = require('./getUserInfo');
const getActiveListings = require('./getActiveListings');
const getCompletedListings = require('./getCompletedListings');
const getReceivedListings = require('./getReceivedListings');
const getListingDetails = require('./getListingDetails');
const createUser = require('./createUser');

module.exports = {
  searchListings,
  details,
  createPost,
  getLanding,
  getUserInfo,
  getActiveListings,
  getCompletedListings,
  getReceivedListings,
  getListingDetails,
  createUser,
}