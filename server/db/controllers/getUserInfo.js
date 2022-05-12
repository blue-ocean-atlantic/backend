const { Users } = require('../model');

module.exports = async function (id) {
  console.log('this is it', id)
  // const query = zipcode ? {zipcode: zipcode} : {};
<<<<<<< HEAD
  try {
    let userProfile = await Users.findOne({user_id: id}).select('-_id -password -__v -zipcode -bio -email -id')
    // .populate('ratingDetails');
    return userProfile;
=======


  if(!id) {
    try {
      let results = await Users.findOne({}).sort({user_id: -1}).select('-_id');
          return results;
      
>>>>>>> main
  } catch(err) {
    console.log('something went wrong inside getUserDetails: ', err.message);
    return err.message;
  }
  } else {
    try {
      let userProfile = await Users.find({id}).select('-_id').limit(10);
      return userProfile;
    } catch(err) {
      console.log('something went wrong inside searchListings: ', err.message);
      return err.message;
    }
  }
}
