const { Users } = require('../model');

module.exports = async function (user_id) {
  try {
    let userProfile = await Users.findOne({user_id}).select('-_id -__v -password -createdAt -updatedAt').exec();

    userProfile = userProfile.toObject();

    let ratings = userProfile.ratings;
    let averageRating = 0

    if (ratings.length > 0) {
      const sumRatings = ratings.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

      averageRating = sumRatings / ratings.length;
    }

    userProfile.average_rating = averageRating;

    return userProfile;
  } catch(err) {
    console.log('something went wrong inside getUserInfo: ', err.message);
    return err.message;
  }
};

//   if(!id) {
//     try {
//       let results = await Users.findOne({}).sort({user_id: -1}).select('-_id');
//           return results;

//   } catch(err) {
//     console.log('something went wrong inside getUserDetails: ', err.message);
//     return err.message;
//   }
//   } else {
//     try {
//       let userProfile = await Users.find({id}).select('-_id').limit(10);
//       return userProfile;
//     } catch(err) {
//       console.log('something went wrong inside searchListings: ', err.message);
//       return err.message;
//     }
//   }
// }
