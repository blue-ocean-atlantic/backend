const { Listings, Users } = require('../model');

// 5) getListingDetails
module.exports = async function (id) {
    try {
      let results = await Listings.find({}).select('-_id').limit(10);
      return results;
    } catch(err) {
      console.log('something went wrong inside searchListings: ', err.message);
      return err.message;
    }
}
