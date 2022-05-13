const { Listings } = require('../model');

module.exports = async function (donor_id) {

  const query = donor_id ? {donor_id} : {};

  try {
    let results = await Listings.find({donor_id: donor_id, completed: true}).select('listing_id title description image_urls').limit(20);
    return results;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
