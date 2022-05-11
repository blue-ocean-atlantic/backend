const { Users } = require('../model');

module.exports = async function (id) {
  console.log('this is it', id)
  // const query = zipcode ? {zipcode: zipcode} : {};
  try {
    let userProfile = await Users.find({id}).select('-_id').limit(10);
    return userProfile;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
