const { Listings, Users, Ratings } = require('../model');
// const Users = require('../model')

module.exports = async function (user_id, title, description, type, images, available_date) {

  console.log('inside createUser');

  try {

    let status = Listings.create({ user_id, title, description, type, images, available_date });
    return status;
  } catch(err) {
    console.log('something went wrong inside createPost controller: ', err.message);
    return err.message;
  }

}
