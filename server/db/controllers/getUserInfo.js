const { Users } = require('../model');

module.exports = async function (id) {

  if(!id) {
    try {
      let results = await Users.findOne({}).sort({user_id: -1}).select('-_id');
          return results;

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
