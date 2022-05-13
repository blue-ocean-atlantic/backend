const { Listings } = require('../model');

module.exports = async function (id) {

    try {
      let results = await Listings.findOne({listing_id: id}).select('-_id -__v -updatedAt').populate('donor', '-password -_id -__v -createdAt -updatedAt');
      return results;
    } catch(err) {
      console.log('something went wrong inside getListingDetails: ', err.message);
      return err.message;
    }
}


