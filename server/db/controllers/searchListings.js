const { Listings } = require('../model');

const searchListings = async (zipCode, res) => {

  const query = zipCode ? {zipCode} : {};

  console.log('making query', query)

  try {
    let results = await Listings.find({zipcode: 6204});
    console.log(results)
    res.send(results);
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
  }

}

module.exports = {
  searchListings,
}