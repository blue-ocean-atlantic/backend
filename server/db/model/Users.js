const mongoose = require('mongoose');

// const tempSchema = new mongoose.Schema({},{strict: false});

const usersSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    index: true,
    required: [true, 'please provide user_id'],
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    minLength: 5,
    maxLength: 5,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  biography: {
    type: String
  },
  photo_url: {
    type: String
  },
  ratings: {
    type: [Number]
  }
}, {toJSON: {virtuals: true}});
usersSchema.index({ user_id: 1 });

usersSchema.virtual('ratingDetails', {
  ref: 'ratings',
  localField: 'user_id',
  foreignField: 'rated_for',
}).get((ratings) => {
  let ratingsSum = 0;
  let average = 0;

  for(let i = 0; i < ratings.length; i++) {
    ratingsSum += ratings[i].rating;
  }

  average = ratingsSum/ratings.length;
  return {rating_average: average, ratings: ratings};
});

const Users = mongoose.model('users', usersSchema);
module.exports = Users;
