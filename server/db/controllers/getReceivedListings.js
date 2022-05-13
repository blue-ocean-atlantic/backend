const { Listings } = require('../model');

module.exports = async function (receiver_id) {

  try {
    let results = await Listings.find({receiver_id}).select('listing_id title description image_urls').limit(10)
    return results;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
