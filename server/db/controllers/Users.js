const { Users } = require('../model');

const createNewUser = (params) => {
  return Users.create(params);
};

const getNextUserId = () => {
  return Users.findOne({}, 'user_id').sort({user_id: -1}).exec();
}

module.exports = {
  createNewUser,
  getNextUserId
};
