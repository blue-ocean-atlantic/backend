const { Listings } = require('../model');

module.exports = async function (zipcode) {

  try {
    let results = await Listings.find().select('-_id').limit(20);
    return results;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
