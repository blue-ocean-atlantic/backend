const { Listings, Users, Ratings } = require('../model');
// const Users = require('../model')

module.exports = async function (id) {

// there is no id in the database so using zip code for now
//also remove limit afterwards
//currentely searching by zipcode and username independentely
  const query = id ? {id} : {};

  try {
    let listing = await Listings.find({zipcode: 75001}).select('-_id').limit(1);

    //hardcoded username
    let username = 'lalldred0';
    let op = await Users.find({username});

    //need to find user rating somehow. no way to correlate users with ratings
    let ratings = await Ratings.find()
    console.log('the query was', op)
    return ratings;
  } catch(err) {
    console.log('something went wrong inside details controller: ', err.message);
    return err.message;
  }

}
