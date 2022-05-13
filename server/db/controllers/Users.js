const { Users } = require('../model');

const createNewUser = (params) => {
  return Users.create(params);
};

const getNextUserId = () => {
  return Users.findOne({}, 'user_id').sort({user_id: -1}).exec();
}

const updateUser = (user_id, updateParams, isUpdateRating = false) => {

  if (!isUpdateRating && Array.isArray(updateParams.ratings)) {
    delete updateParams.ratings;
  }

  return Users.findOneAndUpdate({user_id}, updateParams).exec();
};

module.exports = {
  createNewUser,
  getNextUserId,
  updateUser
};
