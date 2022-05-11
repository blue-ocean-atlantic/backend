const { Users } = require('../model');

const getLandingUsers = (req,res) => {
  let userData = Users.find().then((data)=>{return data});
  return userData;
}

module.exports = {
  getLandingUsers
}