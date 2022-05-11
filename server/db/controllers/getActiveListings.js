const { Listings } = require('../model');

module.exports = async function (donor_id) {

  const query = donor_id ? {donor_id} : {};

  try {
    let results = await Listings.find({zipcode}).select('-_id').limit(10);
    return results;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
