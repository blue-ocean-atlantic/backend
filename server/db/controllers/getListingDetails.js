const { Listings } = require('../model');

module.exports = async function (id) {

    try {
      let results = await Listings.findOne({listing_id: id}).select('-_id -__v').populate('donor', '-password -_id -__v');
      return results;
    } catch(err) {
      console.log('something went wrong inside getListingDetails: ', err.message);
      return err.message;
    }
}


