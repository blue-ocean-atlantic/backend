const { Users } = require('../model');

module.exports = async function (id) {
  console.log('this is it', id)
  // const query = zipcode ? {zipcode: zipcode} : {};
  try {
    let userProfile = await Users.findOne({user_id: id}).select('-_id -password -__v -zipcode -bio -email -id').populate('ratingDetails');
    return userProfile;
  } catch(err) {
    console.log('something went wrong inside searchListings: ', err.message);
    return err.message;
  }

}
