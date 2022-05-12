const { Users } = require('../model');
// const Users = require('../model')

module.exports = async function (username) {

  console.log("the username is", username)

  try {
    let userInfo = await Users.find({username}).select('-_id -password');
    return userInfo;
  } catch(err) {
    console.log('something went wrong inside checkUsername: ', err.message);
    return err.message;
  }

}
