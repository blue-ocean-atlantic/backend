const { Listings } = require('../model');

// 5) getListingDetails
module.exports = async function (id) {
<<<<<<< HEAD

    console.log('inside get listing details')
  try {
    let listingData = await Listings.findOne({listing_id: id}).select('-_id').limit(10)
    .populate('donor', '-_id -password -__v');

    return listingData;
  } catch(err) {
    console.log('something went wrong inside getListingDetails: ', err.message);
    return err.message;
  }

=======
    try {
      let results = await Listings.find({}).select('-_id').limit(10);
      return results;
    } catch(err) {
      console.log('something went wrong inside searchListings: ', err.message);
      return err.message;
    }
>>>>>>> main
}
