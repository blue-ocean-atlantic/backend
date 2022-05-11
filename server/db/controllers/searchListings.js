const { Listings } = require('../model');

module.exports = async function (zipcode, res) {

  const query = zipcode ? {zipcode: zipcode} : {};

  try {
    let results = await Listings.find({zipcode}).select('-_id').limit(10);
    res.send(results);
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    res.send(err.message);
  }

}
