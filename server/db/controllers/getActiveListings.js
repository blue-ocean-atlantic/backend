const { Listings } = require('../model');

module.exports = async function (donor_id) {

  try {
    let results = await Listings.find({donor_id: donor_id, completed: false}).select('listing_id title description image_urls').limit(20);
    return results;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
