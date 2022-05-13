const { Listings } = require('../model');

module.exports = async function (receiver_id) {

  try {
    let results = await Listings.find({receiver_id, completed:true}).select('listing_id title description images_urls -_id').exec();
    return results;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
