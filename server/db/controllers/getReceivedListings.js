const { Listings } = require('../model');

module.exports = async function (donor_id) {

  const query = donor_id ? {donor_id} : {};

  console.log('ReceivedListings: ', query);

  try {
    let results = await Listings.find({}).select('-_id').limit(10);
    return results;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
