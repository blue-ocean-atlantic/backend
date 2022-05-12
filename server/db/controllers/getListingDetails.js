const { Listings } = require('../model');

module.exports = async function (id) {

  const query = id ? {id} : {};

  console.log('getListingDetails: ', query);

  try {
    let results = await Listings.find({}).select('-_id').limit(10);
    return results;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
